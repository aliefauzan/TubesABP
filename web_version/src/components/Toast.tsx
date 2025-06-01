'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success': return <FiCheckCircle className="w-7 h-7" />;
      case 'error': return <FiXCircle className="w-7 h-7" />;
      case 'warning': return <FiAlertCircle className="w-7 h-7" />;
      case 'info': return <FiInfo className="w-7 h-7" />;
    }
  };

  const getColors = (type: Toast['type']) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}      {/* Toast Container */}
      <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 space-y-4 max-w-lg sm:max-w-lg w-full sm:w-auto">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`w-full ${getColors(toast.type)} border-2 rounded-2xl shadow-2xl transform transition-all duration-300 animate-slide-in-right backdrop-blur-sm`}
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {getIcon(toast.type)}
                </div>
                <div className="ml-5 flex-1 min-w-0">
                  <p className="text-lg font-bold leading-tight">
                    {toast.title}
                  </p>
                  {toast.message && (
                    <p className="mt-3 text-base opacity-90 leading-relaxed">
                      {toast.message}
                    </p>
                  )}
                </div>
                <div className="ml-5 flex-shrink-0">
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="inline-flex p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 hover:opacity-70 transition-opacity"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
