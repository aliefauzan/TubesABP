'use client';

import React from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const ScheduleSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <LoadingSkeleton type="text" className="w-48 h-8 mb-4" />
        
        {/* Search Filters */}
        <div className="bg-white p-6 rounded-xl shadow-card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <LoadingSkeleton type="text" className="w-16 h-4 mb-2" />
              <LoadingSkeleton type="button" className="w-full h-12" />
            </div>
            <div>
              <LoadingSkeleton type="text" className="w-20 h-4 mb-2" />
              <LoadingSkeleton type="button" className="w-full h-12" />
            </div>
            <div>
              <LoadingSkeleton type="text" className="w-16 h-4 mb-2" />
              <LoadingSkeleton type="button" className="w-full h-12" />
            </div>
            <div>
              <LoadingSkeleton type="text" className="w-20 h-4 mb-2" />
              <LoadingSkeleton type="button" className="w-full h-12" />
            </div>
          </div>
        </div>
        
        {/* Sort and Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <LoadingSkeleton type="text" className="w-20 h-5" />
            <LoadingSkeleton type="button" className="w-32 h-10" />
          </div>
          <div className="flex items-center space-x-2">
            <LoadingSkeleton type="button" className="w-24 h-10" />
            <LoadingSkeleton type="button" className="w-28 h-10" />
          </div>
        </div>
      </div>
      
      {/* Train Results */}
      <div className="space-y-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-card overflow-hidden transition-all hover:shadow-card-hover"
          >
            <div className="p-6">
              {/* Train Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <LoadingSkeleton type="text" className="w-48 h-6 mb-2" />
                  <LoadingSkeleton type="text" className="w-32 h-4" />
                </div>
                <div className="mt-4 sm:mt-0">
                  <LoadingSkeleton type="text" className="w-20 h-8" />
                </div>
              </div>
              
              {/* Route and Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Departure */}
                <div className="text-center">
                  <LoadingSkeleton type="text" className="w-16 h-6 mb-1 mx-auto" />
                  <LoadingSkeleton type="text" className="w-24 h-4 mx-auto mb-2" />
                  <LoadingSkeleton type="text" className="w-32 h-4 mx-auto" />
                </div>
                
                {/* Journey Duration */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <LoadingSkeleton type="circle" className="w-2 h-2 mr-2" />
                    <LoadingSkeleton type="circle" className="w-20 h-1" />
                    <LoadingSkeleton type="circle" className="w-2 h-2 ml-2" />
                  </div>
                  <LoadingSkeleton type="text" className="w-20 h-4 mx-auto" />
                </div>
                
                {/* Arrival */}
                <div className="text-center">
                  <LoadingSkeleton type="text" className="w-16 h-6 mb-1 mx-auto" />
                  <LoadingSkeleton type="text" className="w-24 h-4 mx-auto mb-2" />
                  <LoadingSkeleton type="text" className="w-32 h-4 mx-auto" />
                </div>
              </div>
              
              {/* Train Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <LoadingSkeleton type="text" className="w-12 h-4 mb-1" />
                  <LoadingSkeleton type="text" className="w-16 h-5" />
                </div>
                <div>
                  <LoadingSkeleton type="text" className="w-16 h-4 mb-1" />
                  <LoadingSkeleton type="text" className="w-20 h-5" />
                </div>
                <div>
                  <LoadingSkeleton type="text" className="w-20 h-4 mb-1" />
                  <LoadingSkeleton type="text" className="w-12 h-5" />
                </div>
                <div>
                  <LoadingSkeleton type="text" className="w-12 h-4 mb-1" />
                  <LoadingSkeleton type="text" className="w-24 h-6" />
                </div>
              </div>
              
              {/* Action Button */}
              <div className="flex justify-end">
                <LoadingSkeleton type="button" className="w-32 h-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleSkeleton;
