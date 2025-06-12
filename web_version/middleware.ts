import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = [
  '/booking-history',
  '/passenger-info',
  '/payment',
  '/payment-success',
  '/seat-selection',
  '/seats'
];

// Define auth routes that redirect logged-in users
const authRoutes = ['/login', '/register'];

// Helper function to validate token format
function isValidTokenFormat(token: string): boolean {
  // Basic JWT format validation (header.payload.signature)
  const parts = token.split('.');
  return parts.length === 3 && parts.every(part => part.length > 0);
}

// Helper function to check if token is expired (basic check)
function isTokenExpired(token: string): boolean {
  try {
    // Decode JWT payload (basic check without verification)
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    
    // Check if token has expiration and if it's expired
    if (payload.exp && payload.exp < now) {
      return true;
    }
    
    return false;
  } catch (error) {
    // If we can't decode the token, consider it expired
    return true;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') // Skip for files with extensions
  ) {
    return NextResponse.next();
  }
  
  // Check if user has auth token in cookies
  const token = request.cookies.get('token')?.value;
  
  // Enhanced token validation
  let isAuthenticated = false;
  if (token) {
    isAuthenticated = isValidTokenFormat(token) && !isTokenExpired(token);
    
    // If token is invalid or expired, clear the cookie
    if (!isAuthenticated) {
      const response = NextResponse.next();
      response.cookies.delete('token');
      return response;
    }
  }

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // If trying to access protected route without auth, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If trying to access auth routes while authenticated, redirect to home
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Add security headers for all responses
  const response = NextResponse.next();
  
  // Security headers for Cloud Run deployment
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
