'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authService } from '@/utils/api';
import theme from '@/utils/theme';
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiClock } from 'react-icons/fi';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check login status on client-side
    const checkLoginStatus = () => {
      const loggedIn = authService.isLoggedIn();
      setIsLoggedIn(loggedIn);
      
      if (loggedIn) {
        const user = authService.getCurrentUser();
        setUserName(user?.name || '');
      }
    };
    
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsLoggedIn(false);
      setUserName('');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-xl font-bold" style={{ color: theme.primaryColor }}>
                  KeretaXpress
                </span>
              </Link>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link href="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{ backgroundColor: pathname === '/' ? theme.primaryColor : 'transparent' }}
            >
              <span className="flex items-center">
                <FiHome className="mr-1" /> Beranda
              </span>
            </Link>
            
            {isLoggedIn && (
              <Link href="/booking-history"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === '/booking-history' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                    }`}
                    style={{ backgroundColor: pathname === '/booking-history' ? theme.primaryColor : 'transparent' }}
              >
                <span className="flex items-center">
                  <FiClock className="mr-1" /> Riwayat Pemesanan
                </span>
              </Link>
            )}
            
            {isLoggedIn ? (
              <div className="relative ml-3">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="flex items-center text-sm rounded-full focus:outline-none"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <span className="flex items-center gap-1 text-gray-700">
                      <FiUser />
                      {userName}
                    </span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="ml-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <span className="flex items-center">
                      <FiLogOut className="mr-1" /> Keluar
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <Link href="/login"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Masuk
                </Link>
                <Link href="/register"
                      className="ml-3 px-3 py-2 rounded-md text-sm font-medium text-white"
                      style={{ backgroundColor: theme.primaryColor }}
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{ backgroundColor: pathname === '/' ? theme.primaryColor : 'transparent' }}
                  onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center">
                <FiHome className="mr-1" /> Beranda
              </span>
            </Link>
            
            {isLoggedIn && (
              <Link href="/booking-history"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      pathname === '/booking-history' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                    }`}
                    style={{ backgroundColor: pathname === '/booking-history' ? theme.primaryColor : 'transparent' }}
                    onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center">
                  <FiClock className="mr-1" /> Riwayat Pemesanan
                </span>
              </Link>
            )}
            
            {isLoggedIn ? (
              <div className="space-y-1">
                <div className="px-3 py-2 text-base font-medium text-gray-700 flex items-center">
                  <FiUser className="mr-1" /> {userName}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  <span className="flex items-center">
                    <FiLogOut className="mr-1" /> Keluar
                  </span>
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <Link href="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                >
                  Masuk
                </Link>
                <Link href="/register"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white"
                      style={{ backgroundColor: theme.primaryColor }}
                      onClick={() => setIsMenuOpen(false)}
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 