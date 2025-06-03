'use client';

import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

interface MobileMenuToggleProps {
  isOpen: boolean;
  isScrolled: boolean;
  onToggle: () => void;
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({
  isOpen,
  isScrolled,
  onToggle
}) => {
  return (
    <button
      onClick={onToggle}
      className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
        isScrolled
          ? 'text-gray-600 hover:bg-gray-100'
          : 'text-white hover:bg-white/20'
      }`}
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <FaTimes className="w-5 h-5" />
      ) : (
        <FaBars className="w-5 h-5" />
      )}
    </button>
  );
};

export default MobileMenuToggle;
