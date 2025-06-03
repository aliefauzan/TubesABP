'use client';

import React from 'react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

interface UserMenuProps {
  isScrolled: boolean;
  onAccountDialog: () => void;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ 
  isScrolled, 
  onAccountDialog, 
  onLogout 
}) => {
  return (
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
          <button 
            onClick={onAccountDialog}
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 w-full text-left"
          >
            <FaUser className="w-4 h-4" />
            <span>Profil</span>
          </button>
          <hr className="my-2 border-gray-200" />
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 w-full text-left"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
