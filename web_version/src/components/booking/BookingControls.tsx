'use client';

import React from 'react';
import Button from '@/components/Button';
import { FiRefreshCw, FiFilter, FiClock } from 'react-icons/fi';

interface BookingControlsProps {
  totalBookings: number;
  selectedStatusFilter: string;
  isLoading: boolean;
  onRefresh: () => void;
  onStatusFilterChange: (status: string) => void;
}

const BookingControls: React.FC<BookingControlsProps> = ({
  totalBookings,
  selectedStatusFilter,
  isLoading,
  onRefresh,
  onStatusFilterChange
}) => {
  const statusOptions = ['Semua', 'pending', 'confirmed'];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center space-x-3 mb-4 sm:mb-0">
        <div className="p-2 bg-blue-50 rounded-lg">
          <FiClock className="text-blue-600 text-lg" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Total Pemesanan</h3>
          <p className="text-sm text-gray-600">{totalBookings} tiket ditemukan</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Button 
          onClick={onRefresh} 
          variant="outline" 
          className="flex items-center bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 shadow-sm"
        >
          <FiRefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} /> 
          Segarkan
        </Button>
        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={selectedStatusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-700 font-medium"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BookingControls;
