'use client';

import React from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const SeatSelectionSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <LoadingSkeleton type="text" className="w-64 h-8 mb-6 mx-auto" />
        
        {/* Train Information Card */}
        <div className="bg-white p-6 rounded-xl shadow-card mb-8">
          <div className="flex items-center mb-6">
            <LoadingSkeleton type="circle" className="w-5 h-5 mr-2" />
            <LoadingSkeleton type="text" className="w-48 h-6" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 border-r border-gray-200 pr-6">
              <LoadingSkeleton type="text" className="w-20 h-4 mb-2" />
              <LoadingSkeleton type="text" className="w-40 h-6 mb-2" />
              <div className="flex items-center mt-1">
                <LoadingSkeleton type="circle" className="w-16 h-5 mr-2" />
                <LoadingSkeleton type="text" className="w-20 h-4" />
              </div>
            </div>
            
            <div className="md:col-span-5 border-r border-gray-200 pr-6">
              <LoadingSkeleton type="text" className="w-24 h-4 mb-2" />
              <div className="mt-2 space-y-3">
                <div className="flex">
                  <div className="mr-3">
                    <LoadingSkeleton type="circle" className="w-3 h-3" />
                    <div className="w-0.5 h-10 bg-gray-300 mx-auto"></div>
                  </div>
                  <div>
                    <LoadingSkeleton type="text" className="w-32 h-4 mb-1" />
                    <LoadingSkeleton type="text" className="w-40 h-5" />
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3">
                    <LoadingSkeleton type="circle" className="w-3 h-3" />
                  </div>
                  <div>
                    <LoadingSkeleton type="text" className="w-28 h-4 mb-1" />
                    <LoadingSkeleton type="text" className="w-36 h-5" />
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <LoadingSkeleton type="circle" className="w-24 h-6" />
              </div>
            </div>
            
            <div className="md:col-span-3">
              <LoadingSkeleton type="text" className="w-28 h-4 mb-2" />
              <LoadingSkeleton type="text" className="w-32 h-6 mb-2" />
              <LoadingSkeleton type="text" className="w-24 h-4" />
            </div>
          </div>
        </div>        {/* Seat Selection */}
        <div className="bg-white p-6 rounded-xl shadow-card mb-8">
          {/* Seat Selection Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <LoadingSkeleton type="circle" className="w-5 h-5 mr-2" />
              <LoadingSkeleton type="text" className="w-32 h-6" />
            </div>
            <LoadingSkeleton type="text" className="w-40 h-4 mx-auto" />
          </div>
          
          {/* Seat Legend */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="flex items-center">
              <LoadingSkeleton type="circle" className="w-6 h-6 mr-2" />
              <LoadingSkeleton type="text" className="w-16 h-4" />
            </div>
            <div className="flex items-center">
              <LoadingSkeleton type="circle" className="w-6 h-6 mr-2" />
              <LoadingSkeleton type="text" className="w-12 h-4" />
            </div>
            <div className="flex items-center">
              <LoadingSkeleton type="circle" className="w-6 h-6 mr-2" />
              <LoadingSkeleton type="text" className="w-24 h-4" />
            </div>
          </div>
          
          {/* Enhanced Train Seat Layout */}
          <div className="border border-gray-200 rounded-lg bg-gradient-to-b from-gray-50 to-white">
            {/* Train Front */}
            <div className="text-center py-4 border-b border-gray-200 bg-gray-100 rounded-t-lg">
              <LoadingSkeleton type="circle" className="w-32 h-8 mx-auto" />
            </div>            {/* Seats Container */}
            <div className="p-6">
              <div className="max-w-md mx-auto space-y-3">
                {/* Generate skeleton rows for A seats with aisle layout */}
                {[...Array(6)].map((_, rowIndex) => (
                  <div key={rowIndex} className="flex items-center justify-center space-x-2">
                    {/* Left side seats (A1, A2) */}
                    <LoadingSkeleton type="circle" className="w-12 h-12" />
                    <LoadingSkeleton type="circle" className="w-12 h-12" />
                    
                    {/* Aisle space */}
                    <div className="w-8"></div>
                    
                    {/* Right side seats (A3, A4) */}
                    <LoadingSkeleton type="circle" className="w-12 h-12" />
                    <LoadingSkeleton type="circle" className="w-12 h-12" />
                    
                    {/* Row number */}
                    <div className="ml-3 w-6">
                      <LoadingSkeleton type="text" className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Selection Summary and Continue Button */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <LoadingSkeleton type="circle" className="w-8 h-8 mr-3" />
              <div>
                <LoadingSkeleton type="text" className="w-24 h-4 mb-1" />
                <LoadingSkeleton type="text" className="w-16 h-5" />
              </div>
            </div>
            <LoadingSkeleton type="button" className="w-full md:w-48 h-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionSkeleton;
