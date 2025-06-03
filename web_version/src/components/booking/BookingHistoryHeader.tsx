'use client';

import React from 'react';

interface BookingHistoryHeaderProps {
  totalBookings: number;
}

const BookingHistoryHeader: React.FC<BookingHistoryHeaderProps> = ({ totalBookings }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">Riwayat Pemesanan</h1>
        <div className="w-1.5 h-8 bg-primary rounded-l ml-3"></div>
      </div>
      <p className="text-lg text-blue-100 max-w-2xl mx-auto">
        Kelola dan pantau semua perjalanan kereta Anda dengan mudah. 
        Lihat detail pemesanan, status pembayaran, dan riwayat perjalanan lengkap.
      </p>
      {totalBookings > 0 && (
        <p className="text-sm text-blue-200 mt-2">
          {totalBookings} pemesanan ditemukan
        </p>
      )}
    </div>
  );
};

export default BookingHistoryHeader;
