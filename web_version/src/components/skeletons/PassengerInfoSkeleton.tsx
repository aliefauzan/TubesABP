'use client';

import React from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const PassengerInfoSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center mb-6">
          <LoadingSkeleton type="circle" className="w-2 h-6 mr-3" />
          <LoadingSkeleton type="text" className="w-48 h-8" />
        </div>
        
        {/* Trip Summary */}
        <div className="bg-white p-6 rounded-xl shadow-card mb-8">
          <LoadingSkeleton type="text" className="w-40 h-6 mb-6" />
          
          {/* Train Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <LoadingSkeleton type="text" className="w-48 h-6 mb-2" />
              <LoadingSkeleton type="text" className="w-32 h-4" />
            </div>
            <div className="mt-4 md:mt-0">
              <LoadingSkeleton type="text" className="w-24 h-5" />
            </div>
          </div>
          
          {/* Route and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <LoadingSkeleton type="text" className="w-20 h-4 mb-2" />
              <LoadingSkeleton type="text" className="w-full h-5" />
            </div>
            <div>
              <LoadingSkeleton type="text" className="w-16 h-4 mb-2" />
              <LoadingSkeleton type="text" className="w-full h-5" />
            </div>
            <div>
              <LoadingSkeleton type="text" className="w-24 h-4 mb-2" />
              <LoadingSkeleton type="text" className="w-full h-5" />
            </div>
          </div>
          
          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <LoadingSkeleton type="text" className="w-16 h-4 mb-2" />
              <LoadingSkeleton type="text" className="w-20 h-5" />
            </div>
            <div>
              <LoadingSkeleton type="text" className="w-20 h-4 mb-2" />
              <LoadingSkeleton type="text" className="w-24 h-5" />
            </div>
          </div>
        </div>
        
        {/* Passenger Form */}
        <div className="bg-white p-6 rounded-xl shadow-card mb-8">
          <LoadingSkeleton type="text" className="w-36 h-6 mb-6" />
          
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <LoadingSkeleton type="text" className="w-32 h-5 mb-2" />
              <LoadingSkeleton type="button" className="w-full h-12" />
            </div>
            
            {/* ID Number Field */}
            <div>
              <LoadingSkeleton type="text" className="w-28 h-5 mb-2" />
              <LoadingSkeleton type="button" className="w-full h-12" />
            </div>
            
            {/* Date of Birth Field */}
            <div>
              <LoadingSkeleton type="text" className="w-24 h-5 mb-2" />
              <LoadingSkeleton type="button" className="w-full h-12" />
            </div>
            
            {/* Gender Field */}
            <div>
              <LoadingSkeleton type="text" className="w-20 h-5 mb-2" />
              <LoadingSkeleton type="button" className="w-full h-12" />
            </div>
          </div>
        </div>
        
        {/* Price Summary */}
        <div className="bg-white p-6 rounded-xl shadow-card mb-8">
          <LoadingSkeleton type="text" className="w-32 h-6 mb-4" />
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <LoadingSkeleton type="text" className="w-24 h-4" />
              <LoadingSkeleton type="text" className="w-20 h-4" />
            </div>
            <div className="flex justify-between items-center">
              <LoadingSkeleton type="text" className="w-20 h-4" />
              <LoadingSkeleton type="text" className="w-16 h-4" />
            </div>
            <div className="flex justify-between items-center">
              <LoadingSkeleton type="text" className="w-28 h-4" />
              <LoadingSkeleton type="text" className="w-18 h-4" />
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <LoadingSkeleton type="text" className="w-16 h-6" />
                <LoadingSkeleton type="text" className="w-28 h-6" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <LoadingSkeleton type="button" className="w-full h-14" />
      </div>
    </div>
  );
};

export default PassengerInfoSkeleton;
