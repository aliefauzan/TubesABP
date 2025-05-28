'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { Booking, Train } from '@/types';
import { formatCurrency, formatDate, formatTime } from '@/utils/format';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [train, setTrain] = useState<Train | null>(null);

  useEffect(() => {
    // Retrieve booking from sessionStorage
    const storedBooking = sessionStorage.getItem('currentBooking');
    const storedTrain = sessionStorage.getItem('selectedTrain');
    
    if (!storedBooking || !storedTrain) {
      router.push('/search');
      return;
    }
    
    setBooking(JSON.parse(storedBooking));
    setTrain(JSON.parse(storedTrain));
  }, [router]);
  const handleViewBookings = () => {
    router.push('/bookings');
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
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="text-center mb-8">
            <div className="bg-green-100 text-green-700 rounded-full p-5 w-24 h-24 mx-auto mb-5 flex items-center justify-center shadow-inner">
              <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-700 mb-3">Pembayaran Berhasil!</h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Pemesanan Anda telah dikonfirmasi. Terima kasih telah menggunakan KeretaXpress!
            </p>
          </div>
            <div className="mb-6">
            <h2 className="text-xl font-bold mb-5 text-center border-b border-gray-200 pb-2">Detail Pemesanan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <p className="text-gray-600 text-sm">ID Transaksi</p>
                <p className="font-bold">{booking.transactionId}</p>
              </div>
              
              <div className="md:text-right">
                <p className="text-gray-600 text-sm">Status</p>
                <p className="font-bold text-green-600 flex items-center md:justify-end">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Terkonfirmasi
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-5">
              <h3 className="font-bold mb-3 flex items-center">
                <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Informasi Kereta
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600 text-sm">Kereta</p>
                  <p className="font-medium">{train.name}</p>
                  <p className="text-sm text-gray-500">{train.operator} • {train.classType}</p>
                </div>
                
                <div className="md:text-right">
                  <p className="text-gray-600 text-sm">Tanggal Perjalanan</p>
                  <p className="font-medium">{formatDate(booking.date)}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-5">
              <h3 className="font-bold mb-3 flex items-center">
                <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Detail Perjalanan
              </h3>
              
              <div className="flex items-center mb-2">
                <div className="font-medium w-20 text-right">{formatTime(train.departure)}</div>
                <div className="mx-3 w-3 h-3 bg-primary rounded-full"></div>
                <div>{train.departureStationName}</div>
              </div>
              
              <div className="flex items-center mb-1">
                <div className="w-20 text-right"></div>
                <div className="mx-3 border-l-2 border-dashed border-gray-300 h-8"></div>
                <div></div>
              </div>
              
              <div className="flex items-center">
                <div className="font-medium w-20 text-right">{formatTime(train.arrivalTime)}</div>
                <div className="mx-3 w-3 h-3 bg-secondary rounded-full"></div>
                <div>{train.arrivalStationName}</div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-5">
              <h3 className="font-bold mb-3 flex items-center">
                <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Detail Penumpang
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Nama Penumpang</p>
                  <p className="font-medium">{booking.passengerName}</p>
                </div>
                
                <div className="md:text-right">
                  <p className="text-gray-600 text-sm">Kursi</p>
                  <p className="font-medium">{booking.seatNumber}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="font-bold">Total Pembayaran</p>
                <p className="font-bold text-secondary text-xl">{formatCurrency(Number(booking.price))}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleViewBookings}
              className="flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Lihat Pemesanan Saya
            </Button>
            <Button 
              variant="primary" 
              onClick={handleBackToHome}
              className="flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
              </svg>
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
