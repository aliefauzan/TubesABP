'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/utils/api';
import { User } from '@/types';
import { 
  HomeIcon, 
  ClockIcon, 
  TicketIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  ClockIcon as ClockIconSolid,
  TicketIcon as TicketIconSolid,
  UserCircleIcon as UserCircleIconSolid
} from '@heroicons/react/24/solid';

const BottomNavigation = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAccountDialog, setShowAccountDialog] = useState(false);
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

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setShowAccountDialog(false);
      router.push('/');
      // Refresh the page to clear any user-specific state
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAccountClick = () => {
    if (user) {
      setShowAccountDialog(!showAccountDialog);
    } else {
      router.push('/login');
    }
  };

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const navItems = [
    {
      label: 'BERANDA',
      path: '/',
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
      isActive: isActiveRoute('/')
    },    {
      label: 'JADWAL',
      path: '/schedule',
      icon: ClockIcon,
      iconSolid: ClockIconSolid,
      isActive: isActiveRoute('/schedule')
    },
    {
      label: 'RIWAYAT',
      path: '/booking-history',
      icon: TicketIcon,
      iconSolid: TicketIconSolid,
      isActive: isActiveRoute('/booking-history')
    },
    {
      label: 'AKUN',
      path: '#',
      icon: UserCircleIcon,
      iconSolid: UserCircleIconSolid,
      isActive: showAccountDialog || isActiveRoute('/profile'),
      onClick: handleAccountClick
    }
  ];

  return (
    <>      {/* Account Dialog/Modal */}
      {showAccountDialog && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl transform transition-all duration-200 animate-scale-in">
            <div className="text-center mb-6">
              <UserCircleIconSolid className="w-16 h-16 mx-auto text-primary mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 truncate">{user.name}</h3>
              <p className="text-gray-600 text-sm truncate">{user.email}</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowAccountDialog(false);
                  router.push('/profile');
                }}
                className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Profil Saya
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2 px-4 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
              >
                Keluar
              </button>
              <button
                onClick={() => setShowAccountDialog(false)}
                className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200/50 shadow-lg z-40">
        <div className="flex justify-around items-center py-2 px-4">
          {navItems.map((item) => {
            const IconComponent = item.isActive ? item.iconSolid : item.icon;
            
            if (item.onClick) {
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 transition-colors ${
                    item.isActive 
                      ? 'text-primary' 
                      : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  <IconComponent className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.path}
                className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 transition-colors ${
                  item.isActive 
                    ? 'text-primary' 
                    : 'text-gray-500 hover:text-primary'
                }`}
              >
                <IconComponent className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden behind bottom nav */}
      <div className="h-20"></div>
    </>
  );
};

export default BottomNavigation;
