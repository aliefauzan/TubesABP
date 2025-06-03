'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavbarLogo from './navbar/NavbarLogo';
import QuickActions from './navbar/QuickActions';
import UserMenu from './navbar/UserMenu';
import AuthButtons from './navbar/AuthButtons';
import MobileMenu from './navbar/MobileMenu';
import MobileMenuToggle from './navbar/MobileMenuToggle';
import AccountDialog from './navbar/AccountDialog';

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
}) => {  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [showAccountDialog, setShowAccountDialog] = useState(false);

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
  const handleAccountDialog = () => {
    setShowAccountDialog(!showAccountDialog);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavbarLogo isScrolled={isScrolled} />

          <div className="flex items-center gap-3">
            <QuickActions
              isScrolled={isScrolled}
              isLoggedIn={isLoggedIn}
              notifications={notifications}
              onSearchClick={handleSearchClick}
              onHistoryClick={handleHistoryClick}
              onNotificationsClick={handleNotificationsClick}
            />

            {isLoggedIn ? (
              <UserMenu
                isScrolled={isScrolled}
                onAccountDialog={handleAccountDialog}
                onLogout={handleLogout}
              />
            ) : (
              <AuthButtons isScrolled={isScrolled} />
            )}

            <MobileMenuToggle
              isOpen={isMobileMenuOpen}
              isScrolled={isScrolled}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>        <MobileMenu
          isOpen={isMobileMenuOpen}
          isLoggedIn={isLoggedIn}
          notifications={notifications}
          onSearchClick={handleSearchClick}
          onHistoryClick={handleHistoryClick}
          onNotificationsClick={handleNotificationsClick}
          onAccountDialog={handleAccountDialog}
          onLogout={handleLogout}
          onClose={handleMobileMenuClose}
        />
      </div>

      <AccountDialog
        isOpen={showAccountDialog}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onClose={() => setShowAccountDialog(false)}
      />
    </nav>
  );
};

export default EnhancedNavbar;
