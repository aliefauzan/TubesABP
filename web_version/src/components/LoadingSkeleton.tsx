'use client';

import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  type?: 'card' | 'text' | 'circle' | 'button';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className = '', type = 'card' }) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] relative overflow-hidden';
  
  const getTypeClasses = () => {
    switch (type) {
      case 'text':
        return 'h-4 rounded';
      case 'circle':
        return 'rounded-full';
      case 'button':
        return 'h-12 rounded-xl';
      default:
        return 'h-32 rounded-2xl';
    }
  };

  return (
    <div className={`${baseClasses} ${getTypeClasses()} ${className}`}>
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        style={{
          animation: 'shimmer 2s ease-in-out infinite',
          transform: 'translateX(-100%)',
        }}
      />
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

// Skeleton components for specific use cases
export const StationListSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 bg-white/95 rounded-xl">
        <LoadingSkeleton type="circle" className="w-12 h-12" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton type="text" className="w-3/4" />
          <LoadingSkeleton type="text" className="w-1/2 h-3" />
        </div>
      </div>
    ))}
  </div>
);

export const SearchResultsSkeleton: React.FC = () => (
  <div className="space-y-6">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white/95 rounded-2xl p-6 border border-white/20">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <LoadingSkeleton type="text" className="w-32" />
            <LoadingSkeleton type="text" className="w-24 h-3" />
          </div>
          <LoadingSkeleton type="text" className="w-20" />
        </div>
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <LoadingSkeleton type="text" className="w-40" />
            <LoadingSkeleton type="text" className="w-32 h-3" />
          </div>
          <LoadingSkeleton type="button" className="w-24" />
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
