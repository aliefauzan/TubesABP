'use client';

import React, { useState, useEffect } from 'react';
import { FiDownload, FiX, FiSmartphone } from 'react-icons/fi';
import { FaTrain } from 'react-icons/fa';

interface PWAInstallPromptProps {
  onClose?: () => void;
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const hasBeenPrompted = localStorage.getItem('pwa-install-prompted');
    
    if (isStandalone || hasBeenPrompted) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt after a delay (better UX)
      setTimeout(() => {
        setIsVisible(true);
      }, 5000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, show manual install instructions
    if (isIOSDevice && !isStandalone) {
      setTimeout(() => {
        setIsVisible(true);
      }, 8000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      
      setDeferredPrompt(null);
    }
    
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('pwa-install-prompted', 'true');
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <FaTrain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Install KeretaXpress</h3>
                <p className="text-blue-100 text-sm">Get the app experience</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-200"
              aria-label="Close install prompt"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
              <FiSmartphone className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 mb-2">
                {isIOS ? 'Add to Home Screen' : 'Install App'}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {isIOS
                  ? 'Install KeretaXpress on your home screen for quick and easy access when you\'re on the go.'
                  : 'Get faster access to KeretaXpress with our app. Install now for a better experience.'
                }
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Akses cepat tanpa browser</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Notifikasi booking reminder</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Hemat data dan battery</span>
            </div>
          </div>

          {/* iOS Instructions */}          {isIOS && (
            <div className="bg-gray-50 rounded-lg p-5 mb-6">
              <h5 className="font-semibold text-gray-900 mb-3 text-sm">How to install:</h5>
              <ol className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center font-medium">1</span>
                  <span>Tap the share button in Safari</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center font-medium">2</span>
                  <span>Scroll down and tap &quot;Add to Home Screen&quot;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center font-medium">3</span>
                  <span>Tap &quot;Add&quot; to confirm</span>
                </li>
              </ol>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!isIOS && deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                <FiDownload className="w-4 h-4" />
                Install Now
              </button>
            )}
            <button
              onClick={handleClose}
              className={`${!isIOS && deferredPrompt ? 'flex-none' : 'flex-1'} py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200`}
            >
              {isIOS ? 'Got it' : 'Maybe later'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
