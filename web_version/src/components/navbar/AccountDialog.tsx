'use client';

import React from 'react';
import { FaUser } from 'react-icons/fa';

// CSS animations
const animationStyles = `
  @keyframes scaleIn {
    0% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  }
  .animate-scale-in {
    animation: scaleIn 0.2s ease-out forwards;
  }
`;

interface AccountDialogProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
  onClose: () => void;
}

const AccountDialog: React.FC<AccountDialogProps> = ({
  isOpen,
  isLoggedIn,
  onLogout,
  onClose
}) => {
  if (!isOpen || !isLoggedIn) return null;

  const getUserData = () => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : { name: 'User', email: 'email@example.com' };
    }
    return { name: 'User', email: 'email@example.com' };
  };

  const user = getUserData();
  return (
    <>
      <style jsx>{animationStyles}</style>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl transform transition-all duration-200 animate-scale-in">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <FaUser className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {user.name}
            </h3>
            <p className="text-gray-600 text-sm truncate">
              {user.email}
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={onLogout}
              className="w-full py-2 px-4 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            >
              Keluar
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDialog;
