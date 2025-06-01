'use client';

import React, { useState, useEffect } from 'react';
import { FiBell, FiX, FiClock, FiAlertCircle, FiInfo, FiCheck } from 'react-icons/fi';
import { FaTrain } from 'react-icons/fa';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'booking' | 'delay';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  action?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
}

interface RealTimeNotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

const RealTimeNotifications: React.FC<RealTimeNotificationsProps> = ({
  isOpen,
  onClose
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications - in real app, these would come from WebSocket or SSE
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'booking',
        title: 'Reminder Perjalanan',
        message: 'Kereta Jakarta-Bandung berangkat dalam 2 jam. Jangan lupa siapkan dokumen!',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isRead: false,
        action: {
          text: 'Lihat Tiket',
          href: '/tickets/12345'
        }
      },
      {
        id: '2',
        type: 'delay',
        title: 'Informasi Keterlambatan',
        message: 'Kereta Argo Bromo mengalami keterlambatan 15 menit dari jadwal.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        isRead: false
      },
      {
        id: '3',
        type: 'success',
        title: 'Pembayaran Berhasil',
        message: 'Pembayaran tiket Jakarta-Yogyakarta telah berhasil diproses.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isRead: true,
        action: {
          text: 'Download E-Ticket',
          onClick: () => console.log('Download ticket')
        }
      },
      {
        id: '4',
        type: 'info',
        title: 'Promo Spesial',
        message: 'Dapatkan diskon 20% untuk perjalanan akhir pekan. Buruan pesan!',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
        action: {
          text: 'Lihat Promo',
          href: '/promo'
        }
      },
      {
        id: '5',
        type: 'warning',
        title: 'Perawatan Sistem',
        message: 'Sistem akan maintenance pada 01:00-03:00 WIB. Mohon maaf atas ketidaknyamanannya.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isRead: true
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
  }, []);

  // Simulate real-time notifications
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      // Randomly add new notifications
      if (Math.random() > 0.7) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['info', 'booking', 'delay'][Math.floor(Math.random() * 3)] as any,
          title: 'Update Perjalanan',
          message: 'Ada update terbaru untuk perjalanan Anda.',
          timestamp: new Date(),
          isRead: false
        };

        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [isOpen]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <FaTrain className="w-4 h-4 text-blue-600" />;
      case 'delay':
        return <FiClock className="w-4 h-4 text-orange-600" />;
      case 'warning':
        return <FiAlertCircle className="w-4 h-4 text-red-600" />;
      case 'success':
        return <FiCheck className="w-4 h-4 text-green-600" />;
      default:
        return <FiInfo className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'booking':
        return 'bg-blue-50 border-blue-200';
      case 'delay':
        return 'bg-orange-50 border-orange-200';
      case 'warning':
        return 'bg-red-50 border-red-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit lalu`;
    if (hours < 24) return `${hours} jam lalu`;
    return `${days} hari lalu`;
  };

  if (!isOpen) return null;

  return (    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <FiBell className="text-xl" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold">Notifikasi</h3>
                <p className="text-blue-100 text-sm">
                  {unreadCount > 0 ? `${unreadCount} belum dibaca` : 'Semua sudah dibaca'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Tandai semua sudah dibaca
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <FiBell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada notifikasi</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 transition-all duration-200 hover:bg-gray-50 ${
                    !notification.isRead ? 'bg-blue-50/50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => !notification.isRead && markAsRead(notification.id)}
                >                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${getNotificationBg(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium truncate ${
                          !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 rounded flex-shrink-0 ml-2"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        
                        {notification.action && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (notification.action?.onClick) {
                                notification.action.onClick();
                              } else if (notification.action?.href) {
                                window.location.href = notification.action.href;
                              }
                            }}
                            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full transition-colors duration-200"
                          >
                            {notification.action.text}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            Notifikasi diperbarui secara real-time
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealTimeNotifications;
