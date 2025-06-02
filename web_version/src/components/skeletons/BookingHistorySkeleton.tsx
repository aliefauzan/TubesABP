'use client';

import React from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const BookingHistorySkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Enhanced Title Section Skeleton */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <LoadingSkeleton type="text" className="w-80 h-10" />
        </div>
        <LoadingSkeleton type="text" className="w-96 h-6 mx-auto" />
      </div>

      {/* Action Controls Section Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="p-2 bg-blue-50 rounded-lg">
            <LoadingSkeleton type="text" className="w-6 h-6" />
          </div>
          <div>
            <LoadingSkeleton type="text" className="w-32 h-5 mb-1" />
            <LoadingSkeleton type="text" className="w-28 h-4" />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <LoadingSkeleton type="button" className="w-32 h-10" />
          <LoadingSkeleton type="button" className="w-40 h-10" />
        </div>
      </div>

      {/* Booking Cards Skeleton */}
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-card overflow-hidden"
          >
            <div className="p-5 border-l-4 border-gray-200">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                <div className="flex-1">
                  <LoadingSkeleton type="text" className="w-48 h-6 mb-2" />
                  <LoadingSkeleton type="text" className="w-32 h-4" />
                </div>
                <div className="mt-2 sm:mt-0">
                  <LoadingSkeleton type="button" className="w-24 h-8 rounded-full" />
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx}>
                    <LoadingSkeleton type="text" className="w-20 h-4 mb-1" />
                    <LoadingSkeleton type="text" className="w-full h-5" />
                  </div>
                ))}
              </div>

              {/* Timestamp */}
              <div className="mb-3">
                <LoadingSkeleton type="text" className="w-40 h-3" />
              </div>

              {/* Passenger Info */}
              <div className="mb-4">
                <LoadingSkeleton type="text" className="w-20 h-4 mb-1" />
                <LoadingSkeleton type="text" className="w-full h-4" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-3 border-t border-gray-200">
                <LoadingSkeleton type="button" className="w-40 h-10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistorySkeleton;
