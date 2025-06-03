'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';

interface EmptyBookingStateProps {
  selectedStatusFilter: string;
  onShowAllBookings: () => void;
}

const EmptyBookingState: React.FC<EmptyBookingStateProps> = ({ 
  selectedStatusFilter, 
  onShowAllBookings 
}) => {
  const router = useRouter();

  return (
    <div className="text-center py-16 bg-white rounded-xl shadow-sm">
      <div className="mx-auto mb-6 w-40 h-40 relative">
        <Image 
          src="/images/empty-box.svg" 
          alt="Tidak ada data" 
          fill
          className="object-contain opacity-60"
        />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {selectedStatusFilter === 'Semua'
          ? 'Belum Ada Riwayat Pemesanan'
          : `Tidak Ada Pemesanan "${selectedStatusFilter}"`}
      </h3>
      <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
        {selectedStatusFilter === 'Semua'
          ? 'Mulai perjalanan pertama Anda dengan memesan tiket kereta.'
          : `Saat ini tidak ada pemesanan dengan status "${selectedStatusFilter}".`}
      </p>
      {selectedStatusFilter !== 'Semua' ? (
        <Button 
          onClick={onShowAllBookings} 
          variant="outline" 
          className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white"
        >
          Tampilkan Semua Pemesanan
        </Button>
      ) : (
        <Button 
          onClick={() => router.push('/schedule')} 
          className="bg-primary text-white hover:bg-primary-dark"
        >
          Cari Jadwal Kereta
        </Button>
      )}
    </div>
  );
};

export default EmptyBookingState;
