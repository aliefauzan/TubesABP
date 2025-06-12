# 🚄 KeretaXpress Web - Modern Train Booking Platform

<div align="center">

![KeretaXpress Logo](https://img.shields.io/badge/KeretaXpress-Train%20Booking-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-38BDF8?style=for-the-badge&logo=tailwindcss)

*A beautiful, modern, and feature-rich train booking platform built with Next.js 15, TypeScript, and Tailwind CSS*

</div>

## 🌟 Enhanced Features

### 🎨 **Modern UI/UX Design**
- **Stunning Visual Design**: Beautiful dark blue gradient background with animated SVG patterns
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Micro-interactions, hover effects, and loading animations
- **Professional Components**: Consistent design language with modern aesthetics
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

### 🔍 **Advanced Search & Booking System**
- **Intelligent Search**: Auto-suggestions with keyboard navigation
- **Real-time Validation**: Instant feedback on form inputs
- **Multi-step Booking**: Guided booking flow with progress indicators
- **Seat Selection**: Interactive seat map with real-time availability
- **Dynamic Pricing**: Live price updates based on selection

### 🎫 **Comprehensive Booking Management**
- **Booking History**: Complete transaction history with filtering
- **Status Tracking**: Real-time booking status updates
- **Payment Integration**: Secure payment confirmation process
- **Receipt Generation**: Digital receipts and booking confirmations
- **Booking Modifications**: Edit and manage existing bookings

### 📱 **Progressive Web App (PWA) Ready**
- **Offline Capability**: Works without internet connection
- **App-like Experience**: Native app feel in the browser
- **Push Notifications**: Real-time booking updates and reminders
- **Install Prompt**: Add to home screen functionality

### 🔔 **Real-Time Notifications**
- **Toast Notifications**: Instant feedback for user actions
- **Status Updates**: Live booking and payment confirmations
- **Error Handling**: Graceful error messages and recovery
- **Loading States**: Beautiful skeleton loaders during data fetch

## 🚀 Core Features

### **Authentication & User Management**
- Secure user registration and login with form validation
- JWT token-based authentication with Laravel Sanctum
- Protected routes and session management
- User profile management and preferences

### **Train Schedule & Search**
- Advanced search with date picker and station selection
- Real-time train availability and pricing
- Search history and popular routes
- Filtering by price, duration, and departure time

### **Booking Flow**
- Multi-step booking process with validation
- Passenger information collection
- Seat selection with interactive seat map
- Payment confirmation and receipt generation

### **Payment System**
- Payment proof upload functionality
- Transaction ID generation and tracking
- Booking status management (Pending, Confirmed, Cancelled)
- Payment history and receipts

## 🛠️ Technical Stack

### **Frontend Technologies**
- **Next.js 15**: React framework with App Router and server components
- **TypeScript**: Type-safe development with enhanced IDE support
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **React Hook Form**: Performant form handling with validation
- **Axios**: HTTP client for API communication

### **UI Components & Icons**
- **Heroicons**: Professional SVG icon library
- **React Icons**: Extended icon collection
- **React Datepicker**: Advanced date selection component
- **Custom Components**: Reusable UI components with consistent design

### **Development Tools**
- **ESLint**: Code quality and consistency enforcement
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic vendor prefix addition
- **TypeScript Config**: Strict type checking and path mapping

### **Performance & Optimization**
- **Next.js Optimization**: Automatic code splitting and image optimization
- **Bundle Analysis**: Built-in bundle analyzer for size optimization
- **Caching Strategy**: Efficient API caching and state management
- **SEO Optimization**: Meta tags, structured data, and semantic HTML

## 📁 Detailed Project Structure

```
web_version/
├── src/
│   ├── app/                           # Next.js 15 App Router pages
│   │   ├── booking-history/           # Booking history management
│   │   │   └── page.tsx              # Booking history page
│   │   ├── login/                    # User authentication
│   │   │   └── page.tsx              # Login page
│   │   ├── register/                 # User registration
│   │   │   └── page.tsx              # Registration page
│   │   ├── schedule/                 # Train schedule search
│   │   │   └── page.tsx              # Schedule search page
│   │   ├── seat-selection/           # Interactive seat selection
│   │   │   └── page.tsx              # Seat selection page
│   │   ├── passenger-info/           # Passenger details form
│   │   │   └── page.tsx              # Passenger info page
│   │   ├── payment/                  # Payment confirmation
│   │   │   └── page.tsx              # Payment page
│   │   ├── payment-success/          # Payment success page
│   │   │   └── page.tsx              # Success confirmation
│   │   ├── layout.tsx                # Root layout component
│   │   ├── loading.tsx               # Global loading component
│   │   ├── error.tsx                 # Global error component
│   │   ├── not-found.tsx             # 404 page
│   │   └── page.tsx                  # Homepage with features
│   │
│   ├── components/                   # Reusable React components
│   │   ├── auth/                     # Authentication components
│   │   │   ├── AuthButtons.tsx       # Login/Register buttons
│   │   │   └── ProtectedRoute.tsx    # Route protection wrapper
│   │   ├── booking/                  # Booking-related components
│   │   │   ├── BookingCard.tsx       # Individual booking display
│   │   │   ├── BookingHistory.tsx    # History list component
│   │   │   └── BookingStatus.tsx     # Status indicator
│   │   ├── home/                     # Homepage components
│   │   │   ├── HeroSection.tsx       # Hero banner
│   │   │   ├── SearchForm.tsx        # Main search form
│   │   │   ├── FeaturesSection.tsx   # Features showcase
│   │   │   ├── PopularRoutes.tsx     # Popular routes display
│   │   │   └── FloatingActionButton.tsx # Quick actions
│   │   ├── navigation/               # Navigation and layout
│   │   │   ├── EnhancedNavbar.tsx    # Main navigation
│   │   │   ├── BottomNavigation.tsx  # Mobile bottom nav
│   │   │   └── navbar/               # Navbar sub-components
│   │   │       ├── NavbarLogo.tsx
│   │   │       ├── UserMenu.tsx
│   │   │       ├── AuthButtons.tsx
│   │   │       ├── QuickActions.tsx
│   │   │       ├── MobileMenu.tsx
│   │   │       ├── MobileMenuToggle.tsx
│   │   │       └── AccountDialog.tsx
│   │   ├── payment/                  # Payment components
│   │   │   ├── PaymentForm.tsx       # Payment proof upload
│   │   │   └── PaymentConfirmation.tsx # Payment confirmation
│   │   ├── schedule/                 # Schedule and search components
│   │   │   ├── ScheduleFilters.tsx   # Advanced filters
│   │   │   ├── ScheduleControls.tsx  # Sort and view controls
│   │   │   ├── TrainList.tsx         # Train results list
│   │   │   ├── TrainCard.tsx         # Individual train card
│   │   │   ├── ResultsSummary.tsx    # Search results summary
│   │   │   └── RecentSearches.tsx    # Recent search history
│   │   ├── skeletons/                # Loading skeleton components
│   │   │   ├── ScheduleSkeleton.tsx  # Schedule loading state
│   │   │   └── CardSkeleton.tsx      # Generic card skeleton
│   │   ├── ui/                       # Generic UI components
│   │   │   ├── Toast.tsx             # Notification system
│   │   │   ├── Modal.tsx             # Modal dialogs
│   │   │   └── Button.tsx            # Reusable buttons
│   │   ├── PromoCarousel.tsx         # Promotional carousel
│   │   ├── TestimonialSection.tsx    # Customer testimonials
│   │   ├── FeedbackModal.tsx         # User feedback form
│   │   └── PWAInstallPrompt.tsx      # PWA install prompt
│   │
│   ├── contexts/                     # React Context providers
│   │   └── AuthContext.tsx           # Authentication context
│   │
│   ├── types/                        # TypeScript type definitions
│   │   └── index.ts                  # Main type declarations
│   │
│   ├── utils/                        # Utility functions
│   │   ├── api.ts                    # API service layer
│   │   ├── api_new.ts                # Enhanced API services
│   │   ├── api_backup.ts             # Backup API implementation
│   │   ├── apiClient.ts              # API client configuration
│   │   ├── format.ts                 # Data formatting utilities
│   │   └── theme.ts                  # Theme configuration
│   │
│   ├── constants/                    # Application constants
│   │   └── index.ts                  # App-wide constants
│   ├── hooks/                        # Custom React hooks
│   │   └── index.ts                  # Custom hooks collection
│   ├── lib/                          # External library configurations
│   │   └── utils.ts                  # Library utility functions
│   └── styles/                       # Global styles and themes
│       └── globals.css               # Global CSS styles
│
├── public/                           # Static assets (icons, images)
│   ├── favicon.ico                   # App favicon
│   ├── logo/                         # Logo assets
│   └── icons/                        # App icons for PWA
├── .env.local                        # Environment variables
├── .env.example                      # Environment template
├── next.config.js                    # Next.js configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── Dockerfile                        # Docker containerization
├── docker-compose.yml                # Docker compose for local dev
├── cloudbuild.yaml                   # Google Cloud Build config
├── middleware.ts                     # Next.js middleware
├── start-app.ps1                     # Windows startup script
├── verify-deployment.ps1             # Deployment verification
├── DEPLOYMENT.md                     # Deployment documentation
├── FEATURES.md                       # Feature documentation
└── package.json                      # Dependencies and scripts
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm/yarn
- Backend API running (Laravel - see `/tesbackend`)

### **Installation**

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   cd KeretaXpress/web_version
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration:**
   Create `.env.local` file:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   
   # Authentication (if using NextAuth)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # Optional: Analytics and monitoring
   NEXT_PUBLIC_GA_ID=your-google-analytics-id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Available Scripts**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint code quality checks
```

## 🔗 API Integration

### **Backend Requirements**
This web application connects to a Laravel backend API that provides:

- **Authentication**: User registration, login, logout with Sanctum tokens
- **Stations**: Train station data and management
- **Trains**: Schedule search, availability, and pricing
- **Bookings**: Create, read, update booking status
- **Payments**: Payment proof upload and confirmation

### **Base URL Configuration**

**Development:**
```
http://localhost:8000/api
```

**Production:**
```
https://your-backend-domain.com/api
```

### **Key API Endpoints**

#### 🔓 Public Endpoints (No Authentication Required)
```typescript
// Authentication
POST /api/register    # User registration
POST /api/login       # User login

// Public Data
GET /api/stations     # Get all stations
GET /api/trains/all   # Get all trains
```

#### 🔒 Protected Endpoints (Requires Bearer Token)
```typescript
// Authentication
POST /api/logout      # User logout
GET /api/user/{id?}   # Get user profile

// Train Management
GET /api/trains/search           # Search trains by route and date
GET /api/trains/promo           # Get promotional trains
GET /api/trains/{id}/available-seats # Get available seats

// Booking Management
POST /api/bookings              # Create new booking
GET /api/bookings/history       # Get user booking history
PUT /api/bookings/{id}/status   # Update booking status

// Payment Management
POST /api/payments/{id}/upload  # Upload payment proof
```

### **Authentication Implementation**
```typescript
// Example authentication flow
const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (data.token) {
      // Store token for subsequent requests
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Use token for protected routes
const fetchProtectedData = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('/api/bookings/history', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.json();
};
```

### **API Configuration**
Update your backend CORS settings to allow requests from:
```php
// In your Laravel backend config/cors.php
'allowed_origins' => [
    'http://localhost:3000',  // Development
    'https://your-domain.com' // Production
],
```

## 🐳 Docker Deployment

### **Local Docker Setup**
```bash
# Build the Docker image
docker build -t keretaxpress-web .

# Run the container
docker run -p 3000:8080 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000/api \
  keretaxpress-web
```

### **Production Deployment**
The application is optimized for deployment on:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Google Cloud Run**
- **AWS Lambda** (with serverless-nextjs)

#### **Vercel Deployment (Recommended)**
```powershell
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_API_URL production
vercel env add NEXTAUTH_SECRET production
```

#### **Google Cloud Run Deployment**
```powershell
# Prerequisites: Install Google Cloud CLI and login
gcloud auth login
gcloud config set project your-project-id

# Build and deploy using Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Or build locally and deploy
docker build -t gcr.io/your-project-id/keretaxpress-web .
docker push gcr.io/your-project-id/keretaxpress-web

# Deploy to Cloud Run
gcloud run deploy keretaxpress-web \
  --image gcr.io/your-project-id/keretaxpress-web \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="NEXT_PUBLIC_API_URL=https://your-backend-url.com/api"
```

#### **Netlify Deployment**
```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from project directory
netlify deploy --prod --dir=.next
```

## 🔒 Security Features

### **Authentication & Authorization**
- JWT token-based authentication
- Protected route middleware
- Secure session management
- XSS and CSRF protection

### **Data Validation**
- Client-side form validation
- Server-side API validation
- Type safety with TypeScript
- Input sanitization

### **Security Headers**
Configured security headers in `next.config.js`:
```javascript
{
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin'
}
```

## 📱 Mobile Responsiveness

### **Responsive Design**
- **Mobile-first approach** with Tailwind CSS breakpoints
- **Touch-friendly interfaces** with appropriate tap targets
- **Optimized navigation** with hamburger menu for mobile
- **Adaptive layouts** that work on all screen sizes

### **Performance Optimization**
- **Image optimization** with Next.js Image component
- **Code splitting** for faster page loads
- **Lazy loading** for improved performance
- **Service worker** for offline functionality

## 🎨 Design System

### **Color Palette**
```css
/* Primary Colors */
--blue-600: #2563eb    /* Primary brand color */
--blue-700: #1d4ed8    /* Secondary brand color */
--indigo-800: #3730a3  /* Accent color */

/* Gradient Backgrounds */
background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #3730a3 100%);
```

### **Typography**
- **Font Family**: System fonts for optimal performance
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Responsive Sizing**: Fluid typography that scales with screen size

### **Components**
All components follow consistent patterns:
- Hover states and focus indicators
- Loading states with skeleton animations
- Error states with recovery actions
- Success states with confirmation feedback

## 🔄 State Management

### **Client-side State**
- **React Hooks**: useState, useEffect, useCallback for local state
- **Form State**: React Hook Form for complex form management
- **Local Storage**: Persistent storage for user preferences
- **Session Storage**: Temporary data for booking flow

### **Server State**
- **API Caching**: Efficient data fetching and caching
- **Error Boundaries**: Graceful error handling
- **Loading States**: Skeleton loaders and progress indicators

## 🚀 Performance Metrics

### **Core Web Vitals**
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### **Optimization Features**
- Bundle size optimization with Next.js
- Image optimization and lazy loading
- Code splitting and dynamic imports
- Service worker for caching

## 📊 Analytics Ready

### **Tracking Implementation**
Ready for integration with:
- **Google Analytics 4**: User behavior and conversion tracking
- **Hotjar**: User experience and heat map analysis
- **Sentry**: Error monitoring and performance tracking
- **Custom Events**: Booking funnel and conversion optimization

## 🛠️ Development Guidelines

### **Code Quality**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency rules
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for quality assurance

### **Testing Strategy**
```bash
# Unit tests (ready for implementation)
npm run test

# End-to-end tests (Cypress/Playwright ready)
npm run test:e2e

# Component testing
npm run test:components
```

### **Git Workflow**
```bash
# Feature development
git checkout -b feature/new-feature
git commit -m "feat: add new booking feature"
git push origin feature/new-feature
```

## 🎉 Production Ready Features

### **✅ Completed Features**
- Modern, responsive UI/UX design
- Complete booking flow from search to payment
- User authentication and session management
- Real-time notifications and feedback
- Mobile-responsive design
- Error handling and recovery
- Performance optimizations
- Security implementations
- Docker containerization
- TypeScript type safety

### **🚀 Ready for Enhancement**
- PWA implementation (service worker ready)
- Multi-language support (i18n structure)
- Dark/light theme toggle
- Advanced filtering and sorting
- Booking modifications and cancellations
- Loyalty program integration
- Social authentication (Google, Facebook)
- Payment gateway integration (Stripe, PayPal)

## 📞 Support & Documentation

### **Additional Documentation**
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide and instructions
- [API Documentation](../tesbackend/README.md) - Backend API reference

### **Getting Help**
- Check the [Issues](../../issues) for common problems
- Review the [API documentation](../tesbackend/README.md) for backend setup
- Ensure your backend is running and accessible


<div align="center">
<strong>🚄 KeretaXpress - Making train travel booking simple and beautiful</strong>
</div>
