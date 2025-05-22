'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/lib/api';
import { User } from '@/types';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Error parsing user data:', e);
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    }
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path ? 
      'text-primary border-b-2 border-primary font-semibold' : 
      'text-gray-700 hover:text-primary transition-colors duration-200';
  };
  
  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      router.push('/');
      // Refresh the page to clear any user-specific state
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">KeretaXpress</span>
          </Link>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${isActive('/')} py-2`}>
              Home
            </Link>
            <Link href="/search" className={`${isActive('/search')} py-2`}>
              Search Trains
            </Link>
            
            {user ? (
              <>
                <Link href="/booking-history" className={`${isActive('/booking-history')} py-2`}>
                  My Bookings
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-primary">
                    <span>{user.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 hidden group-hover:block border border-gray-100">
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" 
                  className="px-5 py-2 text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/register" 
                  className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                  Register
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <Link
              href="/"
              className={`block py-2 ${isActive('/')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/search"
              className={`block py-2 ${isActive('/search')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Search Trains
            </Link>
            
            {user ? (
              <>
                <Link
                  href="/booking-history"
                  className={`block py-2 ${isActive('/booking-history')}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Bookings
                </Link>
                <hr className="my-2 border-gray-200" />
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{user.name}</span>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-primary hover:text-primary-dark"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link
                  href="/login"
                  className="block w-full py-2 text-center text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block w-full py-2 text-center bg-primary text-white rounded-lg hover:bg-primary-dark"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
