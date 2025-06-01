'use client';

import React from 'react';
import { FaTrain } from 'react-icons/fa';

interface PageLoadingProps {
  message?: string;
  subMessage?: string;
}

const PageLoading: React.FC<PageLoadingProps> = ({ 
  message = "Loading KeretaXpress...", 
  subMessage = "Preparing your journey" 
}) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 z-50 flex items-center justify-center">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="loading-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" className="animate-pulse">
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="18" cy="18" r="1" fill="currentColor" className="animate-pulse">
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur="3s"
                  begin="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loading-pattern)" />
        </svg>
      </div>

      <div className="text-center z-10">
        {/* Main Loading Animation */}
        <div className="relative mb-8">
          {/* Outer Ring */}
          <div className="w-24 h-24 border-4 border-white/20 rounded-full absolute animate-spin"></div>
          
          {/* Inner Ring */}
          <div className="w-24 h-24 border-t-4 border-white border-solid rounded-full animate-spin"></div>
          
          {/* Train Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full p-4 shadow-xl">
              <FaTrain className="text-2xl text-blue-600 animate-pulse" />
            </div>
          </div>
          
          {/* Pulse Effect */}
          <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-ping"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">
            {message}
          </h2>
          <p className="text-blue-100 text-lg">
            {subMessage}
          </p>
          
          {/* Loading Dots */}
          <div className="flex justify-center gap-1 mt-6">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 bg-white/20 rounded-full h-2 mt-8 mx-auto overflow-hidden">
          <div className="bg-gradient-to-r from-white to-blue-200 h-full rounded-full animate-loading-bar"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 75%;
            margin-left: 25%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PageLoading;
