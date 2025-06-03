'use client';

import React from 'react';
import Link from 'next/link';
import { FaUser, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { FiSearch, FiCalendar, FiBell } from 'react-icons/fi';

interface MobileMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  notifications: number;
  onSearchClick: () => void;
  onHistoryClick: () => void;
  onNotificationsClick: () => void;
  onAccountDialog: () => void;
  onLogout: () => void;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  isLoggedIn,
  notifications,
  onSearchClick,
  onHistoryClick,
  onNotificationsClick,
  onAccountDialog,
  onLogout,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden py-4 space-y-2 bg-white rounded-lg mt-2 shadow-lg border border-gray-200">
      {/* Main Navigation for Mobile */}
      <div className="px-4 pb-2 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-500 mb-2">Navigation</p>
        <div className="space-y-1">
          <Link
            href="/"
            className="block px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            onClick={onClose}
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
            onClick={onSearchClick}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <FiSearch className="w-4 h-4" />
            Search
          </button>
          <button
            onClick={onHistoryClick}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <FiCalendar className="w-4 h-4" />
            History
          </button>
          {isLoggedIn && (
            <button
              onClick={onNotificationsClick}
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
          <button
            onClick={onAccountDialog}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
          >
            <FaUser className="w-4 h-4" />
            Profil
          </button>
          <Link
            href="/booking-history"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            onClick={onClose}
          >
            <FaHistory className="w-4 h-4" />
            Riwayat Pemesanan
          </Link>
          <button
            onClick={onLogout}
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
            onClick={onClose}
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg transition-all duration-200"
            onClick={onClose}
          >
            Daftar
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
