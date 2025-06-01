'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { bookingService } from '@/utils/api';
import { Booking, Train } from '@/types';
import { formatCurrency, formatDate, formatTime } from '@/utils/format';

export default function PaymentPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [train, setTrain] = useState<Train | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 minutes in seconds

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
    
    // Set up countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [router]);

  const formatTimeDisplay = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !booking) {
      setError('Silakan pilih file bukti pembayaran');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      await bookingService.uploadPaymentProof(Number(booking.transactionId), file);
      await bookingService.updateBookingStatus(booking.transactionId, 'paid');
      
      // Navigate to success page
      router.push('/payment-success');
    } catch (error: any) {
      console.error('Payment error:', error);
      setError('Gagal mengunggah bukti pembayaran. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
    }
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
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Konfirmasi Pembayaran</h1>
          
          {/* Timer Warning */}
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
          }`}>
            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium">
                {timeLeft > 0 
                  ? `Selesaikan pembayaran dalam ${formatTimeDisplay(timeLeft)}` 
                  : 'Waktu pembayaran habis. Silakan mulai pemesanan baru.'}
              </p>
              <p className="text-sm">Reservasi Anda akan dibatalkan jika pembayaran tidak diselesaikan tepat waktu.</p>
            </div>
          </div>
            {/* Booking Summary */}
          <div className="bg-white p-6 rounded-xl shadow-card mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ringkasan Pemesanan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-gray-600 mb-1">ID Transaksi</p>
                <p className="font-bold">{booking.transactionId}</p>
              </div>
              
              <div className="md:text-right">
                <p className="text-gray-600 mb-1">Tanggal</p>
                <p className="font-medium">{formatDate(booking.date)}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex items-center mb-2">
                <div className="font-medium w-20 text-right">{formatTime(train.departure)}</div>
                <div className="mx-3 w-3 h-3 bg-primary rounded-full"></div>
                <div>{train.departureStationName} </div>
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
            
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Kereta</p>
                  <p className="font-medium">{train.name}</p>
                  <p className="text-sm text-gray-500">{train.operator} • {train.classType}</p>
                </div>
                
                <div>
                  <p className="text-gray-600 mb-1">Penumpang</p>
                  <p className="font-medium">{booking.passengerName}</p>
                  <p className="text-sm text-gray-500">Kursi {booking.seatNumber}</p>
                </div>
                
                <div className="md:text-right">
                  <p className="text-gray-600 mb-1">Total Pembayaran</p>
                  <p className="font-bold text-secondary text-xl">{formatCurrency(Number(booking.price))}</p>
                </div>
              </div>
            </div>
          </div>
            {/* Payment Instructions */}
          <div className="bg-white p-6 rounded-xl shadow-card mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Petunjuk Pembayaran
            </h2>
            
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3 text-primary">Transfer Bank</h3>
              <p className="mb-4">Silakan transfer jumlah yang tepat ke rekening berikut:</p>
              
              <div className="bg-blue-50 p-5 rounded-lg mb-5 border border-blue-100">
                <div className="mb-3">
                  <p className="text-gray-600 text-sm">Bank</p>
                  <p className="font-bold">Bank Central Asia (BCA)</p>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-600 text-sm">Nomor Rekening</p>
                  <p className="font-bold">1234-5678-9012</p>
                </div>
                
                <div>
                  <p className="text-gray-600 text-sm">Nama Rekening</p>
                  <p className="font-bold">PT KeretaXpress Indonesia</p>
                </div>
              </div>
              
              <div className="text-sm bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="font-bold mb-2 text-yellow-800">Catatan Penting:</p>
                <ul className="list-disc pl-5 space-y-1 text-yellow-800">
                  <li>Sertakan ID Transaksi ({booking.transactionId}) dalam referensi transfer</li>
                  <li>Transfer jumlah yang tepat: {formatCurrency(Number(booking.price))}</li>
                  <li>Unggah bukti pembayaran Anda di bawah ini</li>
                </ul>
              </div>
            </div>
            
            {/* Payment Proof Upload */}
            <form onSubmit={handleSubmit} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="font-bold mb-4 flex items-center text-primary">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Unggah Bukti Pembayaran
              </h3>
              
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4">
                  <div className="flex">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p>{error}</p>
                  </div>
                </div>
              )}
              
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Bukti Pembayaran
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-primary file:text-white
                    hover:file:bg-primary/80 transition-colors"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  PNG, JPG, atau JPEG (maksimal 2MB)
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isUploading || !file || timeLeft <= 0}
                  className="px-6"
                >
                  {isUploading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengunggah...
                    </div>
                  ) : 'Konfirmasi Pembayaran'}
                </Button>
              </div>            </form>
          </div>
        </div>
      </div>
  );
}
