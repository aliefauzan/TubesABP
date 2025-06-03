'use client';

import React from 'react';
import { FiSearch, FiCalendar, FiBell } from 'react-icons/fi';

interface QuickActionsProps {
  isScrolled: boolean;
  isLoggedIn: boolean;
  notifications: number;
  onSearchClick: () => void;
  onHistoryClick: () => void;
  onNotificationsClick: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  isScrolled,
  isLoggedIn,
  notifications,
  onSearchClick,
  onHistoryClick,
  onNotificationsClick
}) => {
  return (
    <div className="hidden sm:flex items-center gap-2">
      <button
        onClick={onSearchClick}
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
        onClick={onHistoryClick}
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
      {isLoggedIn && (
        <button
          onClick={onNotificationsClick}
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
  );
};

export default QuickActions;
