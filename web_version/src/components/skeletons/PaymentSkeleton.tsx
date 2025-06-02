'use client';

import React from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const PaymentSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <LoadingSkeleton type="text" className="w-64 h-8 mb-6 mx-auto" />
        
        {/* Timer Warning */}
        <div className="mb-6 p-4 rounded-lg bg-gray-100">
          <div className="flex items-center justify-center">
            <LoadingSkeleton type="circle" className="w-6 h-6 mr-3" />
            <LoadingSkeleton type="text" className="w-48 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div className="bg-white p-6 rounded-xl shadow-card">
            <LoadingSkeleton type="text" className="w-32 h-6 mb-6" />
            
            {/* Train Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <LoadingSkeleton type="text" className="w-40 h-5 mb-1" />
                  <LoadingSkeleton type="text" className="w-24 h-4" />
                </div>
                <LoadingSkeleton type="text" className="w-20 h-5" />
              </div>
              
              <div className="flex items-center justify-center py-4">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <LoadingSkeleton type="text" className="w-12 h-5 mb-1" />
                    <LoadingSkeleton type="text" className="w-16 h-4" />
                  </div>
                  <LoadingSkeleton type="circle" className="w-8 h-2" />
                  <div className="text-center">
                    <LoadingSkeleton type="text" className="w-12 h-5 mb-1" />
                    <LoadingSkeleton type="text" className="w-16 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Details */}
            <div className="border-t pt-4 mb-6">
              <LoadingSkeleton type="text" className="w-28 h-5 mb-3" />
              <div className="space-y-2">
                <LoadingSkeleton type="text" className="w-full h-4" />
                <LoadingSkeleton type="text" className="w-3/4 h-4" />
                <LoadingSkeleton type="text" className="w-1/2 h-4" />
              </div>
            </div>

            {/* Payment Summary */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <LoadingSkeleton type="text" className="w-20 h-4" />
                <LoadingSkeleton type="text" className="w-24 h-4" />
              </div>
              <div className="flex justify-between items-center mb-2">
                <LoadingSkeleton type="text" className="w-16 h-4" />
                <LoadingSkeleton type="text" className="w-20 h-4" />
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <LoadingSkeleton type="text" className="w-16 h-5" />
                <LoadingSkeleton type="text" className="w-28 h-6" />
              </div>
            </div>
          </div>

          {/* Payment Upload */}
          <div className="bg-white p-6 rounded-xl shadow-card">
            <LoadingSkeleton type="text" className="w-40 h-6 mb-6" />
            
            {/* Bank Details */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <LoadingSkeleton type="text" className="w-28 h-5 mb-3" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <LoadingSkeleton type="text" className="w-16 h-4" />
                  <LoadingSkeleton type="text" className="w-24 h-4" />
                </div>
                <div className="flex justify-between">
                  <LoadingSkeleton type="text" className="w-20 h-4" />
                  <LoadingSkeleton type="text" className="w-32 h-4" />
                </div>
                <div className="flex justify-between">
                  <LoadingSkeleton type="text" className="w-24 h-4" />
                  <LoadingSkeleton type="text" className="w-40 h-4" />
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div className="space-y-4">
              <LoadingSkeleton type="text" className="w-36 h-5" />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="text-center">
                  <LoadingSkeleton type="circle" className="w-12 h-12 mx-auto mb-4" />
                  <LoadingSkeleton type="text" className="w-48 h-4 mx-auto mb-2" />
                  <LoadingSkeleton type="text" className="w-32 h-3 mx-auto" />
                </div>
              </div>
              
              <LoadingSkeleton type="button" className="w-full h-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSkeleton;
