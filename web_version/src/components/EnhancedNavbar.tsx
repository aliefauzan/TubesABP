'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaTrain, FaBars, FaTimes, FaUser, FaSignOutAlt, FaHistory, FaHeadset } from 'react-icons/fa';
import { FiSearch, FiCalendar, FiBell } from 'react-icons/fi';

interface EnhancedNavbarProps {
  onSearchClick?: () => void;
  onHistoryClick?: () => void;
  onNotificationsClick?: () => void;
  isLoggedIn?: boolean;
}

const EnhancedNavbar: React.FC<EnhancedNavbarProps> = ({
  onSearchClick,
  onHistoryClick,
  onNotificationsClick,
  isLoggedIn: propIsLoggedIn
}) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const checkLoginStatus = () => {
      // Simple login check without authService dependency
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const loggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : !!token;
        setIsLoggedIn(loggedIn);
      }
    };

    checkLoginStatus();

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [propIsLoggedIn]);
  // Handlers with router functionality
  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      router.push('/schedule');
    }
  };

  const handleHistoryClick = () => {
    if (onHistoryClick) {
      onHistoryClick();
    } else {
      router.push('/booking-history');
    }
  };

  const handleNotificationsClick = () => {
    if (onNotificationsClick) {
      onNotificationsClick();
    } else {
      console.log('Notifications clicked');
    }
  };

  const handleLogout = () => {
    // Simple logout without authService dependency
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  const userMenuItems = isLoggedIn ? [
    { name: 'Profil', href: '/profile', icon: <FaUser className="w-4 h-4" /> },
    { name: 'Riwayat Pemesanan', href: '/booking-history', icon: <FaHistory className="w-4 h-4" /> },
    { name: 'Customer Service', href: '/support', icon: <FaHeadset className="w-4 h-4" /> }
  ] : [];  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              isScrolled 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                : 'bg-white/20 backdrop-blur-sm border border-white/30'
            }`}>
              <FaTrain className={`text-xl transition-all duration-300 ${
                isScrolled ? 'text-white' : 'text-white'
              } group-hover:animate-pulse`} />
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-xl font-bold transition-all duration-300 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                KeretaXpress
              </h1>
              <p className={`text-xs transition-all duration-300 ${
                isScrolled ? 'text-gray-500' : 'text-blue-100'
              }`}>
                Fast & Reliable
              </p>
            </div>          </Link>

          {/* Quick Actions & User Menu */}
          <div className="flex items-center gap-3">
              {/* Quick Actions */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handleSearchClick}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    : 'text-white hover:bg-white/20'
                }`}
                aria-label="Search trains"
              >
                <FiSearch className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleHistoryClick}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    : 'text-white hover:bg-white/20'
                }`}
                aria-label="Booking history"
              >
                <FiCalendar className="w-5 h-5" />
              </button>

              {/* Notifications (only if logged in) */}
              {isLoggedIn && (                <button
                  onClick={handleNotificationsClick}
                  className={`relative p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                    isScrolled
                      ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      : 'text-white hover:bg-white/20'
                  }`}
                  aria-label="Notifications"
                >
                  <FiBell className="w-5 h-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {notifications}
                    </span>
                  )}
                </button>
              )}
            </div>

            {/* User Menu */}            {isLoggedIn ? (
              <div className="relative group">
                <button className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/20'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isScrolled ? 'bg-blue-100' : 'bg-white/20'
                  }`}>
                    <FaUser className={`w-4 h-4 ${
                      isScrolled ? 'text-blue-600' : 'text-white'
                    }`} />
                  </div>
                  <span className="hidden lg:inline font-medium">Akun</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                      <FaUser className="w-4 h-4" />
                      <span>Profil</span>
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 w-full text-left"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>
              </div>            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/login"
                  className={`px-4 py-2 font-medium rounded-lg transition-all duration-200 ${
                    isScrolled
                      ? 'text-blue-600 hover:bg-blue-50'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className={`px-4 py-2 font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                    isScrolled
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                      : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                  }`}
                >
                  Daftar
                </Link>
              </div>
            )}            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                isScrolled
                  ? 'text-gray-600 hover:bg-gray-100'
                  : 'text-white hover:bg-white/20'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-white rounded-lg mt-2 shadow-lg border border-gray-200">
              {/* Main Navigation for Mobile */}
            <div className="px-4 pb-2 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-2">Navigation</p>
              <div className="space-y-1">
                <Link
                  href="/"
                  className="block px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Beranda
                </Link>
              </div>
            </div>
            
            {/* Mobile Quick Actions */}
            <div className="px-4 pb-2 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-2">Quick Actions</p>
              <div className="flex gap-2">
                <button
                  onClick={handleSearchClick}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <FiSearch className="w-4 h-4" />
                  Search
                </button>
                <button
                  onClick={handleHistoryClick}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <FiCalendar className="w-4 h-4" />
                  History
                </button>
                {isLoggedIn && (
                  <button
                    onClick={handleNotificationsClick}
                    className="relative flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <FiBell className="w-4 h-4" />
                    Notifications
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* User Menu for Mobile */}
            {isLoggedIn ? (
              <div className="px-4 space-y-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUser className="w-4 h-4" />
                  Profil
                </Link>
                <Link
                  href="/booking-history"
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaHistory className="w-4 h-4" />
                  Riwayat Pemesanan
                </Link>
                <Link
                  href="/support"
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaHeadset className="w-4 h-4" />
                  Customer Service
                </Link>                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  Keluar
                </button>
              </div>
            ) : (
              <div className="px-4 pt-4 border-t border-gray-200 space-y-2">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm font-medium rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default EnhancedNavbar;
