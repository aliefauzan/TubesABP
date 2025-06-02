'use client';

import React from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const BookingsSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section Skeleton */}
      <div className="bg-gray-100 rounded-xl p-6 mb-8">
        <LoadingSkeleton type="text" className="w-56 h-8 mb-2" />
        <LoadingSkeleton type="text" className="w-80 h-5" />
      </div>

      {/* Booking Cards Skeleton */}
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-card overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-gray-100 to-white p-5 border-b">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="mb-4 md:mb-0">
                  <LoadingSkeleton type="text" className="w-48 h-6 mb-2" />
                  <LoadingSkeleton type="text" className="w-32 h-4" />
                </div>
                <div className="flex items-center space-x-2">
                  <LoadingSkeleton type="circle" className="w-6 h-6" />
                  <LoadingSkeleton type="text" className="w-24 h-5" />
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5">
              {/* Trip Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <LoadingSkeleton type="text" className="w-16 h-4 mb-2" />
                  <div className="flex items-center space-x-3">
                    <LoadingSkeleton type="text" className="w-20 h-5" />
                    <LoadingSkeleton type="circle" className="w-2 h-2" />
                    <LoadingSkeleton type="text" className="w-20 h-5" />
                  </div>
                  <div className="mt-2">
                    <LoadingSkeleton type="text" className="w-32 h-4" />
                  </div>
                </div>
                
                <div>
                  <LoadingSkeleton type="text" className="w-20 h-4 mb-2" />
                  <LoadingSkeleton type="text" className="w-28 h-5 mb-1" />
                  <LoadingSkeleton type="text" className="w-24 h-4" />
                </div>
              </div>

              {/* Passenger Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <LoadingSkeleton type="text" className="w-24 h-5 mb-3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <LoadingSkeleton type="text" className="w-full h-4 mb-1" />
                    <LoadingSkeleton type="text" className="w-3/4 h-4" />
                  </div>
                  <div>
                    <LoadingSkeleton type="text" className="w-full h-4 mb-1" />
                    <LoadingSkeleton type="text" className="w-1/2 h-4" />
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <LoadingSkeleton type="text" className="w-20 h-4 mb-2" />
                  <LoadingSkeleton type="text" className="w-32 h-6" />
                </div>
                <div className="mt-4 md:mt-0">
                  <LoadingSkeleton type="text" className="w-16 h-4 mb-2" />
                  <LoadingSkeleton type="text" className="w-24 h-6" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-3 pt-4 border-t">
                <LoadingSkeleton type="button" className="w-full md:w-auto h-12" />
                <LoadingSkeleton type="button" className="w-full md:w-auto h-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsSkeleton;
