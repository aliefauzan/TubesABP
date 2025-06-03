'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import TripSummaryCard from '@/components/TripSummaryCard';

export default function PaymentSuccessPage() {
  const router = useRouter();  const [booking, setBooking] = useState<any>(null); // Use any for flexible data structure
  const [train, setTrain] = useState<any>(null);

  useEffect(() => {
    // Retrieve booking from sessionStorage
    const storedBooking = sessionStorage.getItem('currentBooking');
    const storedTrain = sessionStorage.getItem('selectedTrain');
    
    if (!storedBooking || !storedTrain) {
      router.push('/schedule');
      return;
    }
    
    setBooking(JSON.parse(storedBooking));
    setTrain(JSON.parse(storedTrain));
  }, [router]);  const handleViewBookings = () => {
    router.push('/booking-history');
  };

  const handleBackToHome = () => {
    // Clear session data
    sessionStorage.removeItem('selectedTrain');
    sessionStorage.removeItem('travelDate');
    sessionStorage.removeItem('selectedSeat');
    sessionStorage.removeItem('currentBooking');
    
    router.push('/');
  };

  if (!booking || !train) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Memuat detail pemesanan...</p>
        </div>
      </div>
    );
  }  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
          Pembayaran Berhasil
        </h1>

        {/* Success Message */}
        <div className="bg-white p-8 rounded-xl shadow-card mb-8">
          <div className="text-center">
            <div className="bg-green-100 text-green-700 rounded-full p-5 w-24 h-24 mx-auto mb-5 flex items-center justify-center shadow-inner">
              <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-green-700 mb-3">Pembayaran Berhasil!</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Pemesanan Anda telah dikonfirmasi. Terima kasih telah menggunakan KeretaXpress!
            </p>
          </div>
        </div>
          {/* Booking Summary */}
        <TripSummaryCard 
          train={train} 
          travelDate={booking.travel_date || (typeof window !== 'undefined' && sessionStorage.getItem('travelDate')) || new Date().toISOString()}
          selectedSeat={booking.seat_number || (typeof window !== 'undefined' && sessionStorage.getItem('selectedSeat')) || 'N/A'}
          showSeat={true}
          className="mb-8"
        />
        
        {/* Transaction Status - separate card */}
        <div className="bg-white p-6 rounded-xl shadow-card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">ID Transaksi</p>
              <p className="font-mono text-sm font-medium">{booking.transaction_id}</p>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Status</p>
              <p className="font-medium text-green-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Terkonfirmasi
              </p>
            </div>
          </div>
        </div>
          {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={handleViewBookings}
            variant="outline"
            className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-4 bg-white shadow-lg"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            LIHAT PEMESANAN SAYA
          </Button>
          
          <Button 
            onClick={handleBackToHome}
            className="w-full bg-primary text-white hover:bg-primary-dark font-bold text-lg py-4 shadow-lg border-0"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
            </svg>
            KEMBALI KE BERANDA
          </Button>
        </div>
      </div>
    </div>
  );
}
