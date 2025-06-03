'use client';

import React from 'react';
import Link from 'next/link';

interface AuthButtonsProps {
  isScrolled: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isScrolled }) => {
  return (
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
  );
};

export default AuthButtons;
