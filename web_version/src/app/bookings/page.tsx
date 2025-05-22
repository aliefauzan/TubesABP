'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { bookingService } from '@/lib/api';
import { Booking } from '@/types';
import { formatCurrency, formatDate, formatTime } from '@/utils/format';

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          router.push('/login');
          return;
        }
        
        const data = await bookingService.getBookingHistory();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load your bookings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'paid':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'paid':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
        );
      case 'pending':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      case 'cancelled':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-primary/10 rounded-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-primary">Riwayat Pemesanan</h1>
          <p className="text-gray-600 mt-2">Lihat status dan detail perjalanan Anda</p>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Memuat riwayat pemesanan...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-bold">Error</h3>
            </div>
            <p className="ml-9 mt-1">{error}</p>
            <div className="ml-9 mt-4">
              <Button variant="primary" onClick={() => window.location.reload()}>
                Coba Lagi
              </Button>
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">Belum Ada Pemesanan</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">Anda belum melakukan pemesanan tiket kereta api. Mulai pesan tiket sekarang untuk melihat riwayat pemesanan di sini.</p>
            <Button variant="primary" onClick={() => router.push('/search')} className="px-6 py-3">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <span>Pesan Tiket Kereta</span>
              </div>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-primary/10 to-white p-5 border-b">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-bold text-gray-800">
                        {booking.train?.departureStation?.city} ke {booking.train?.arrivalStation?.city}
                      </h3>
                      <p className="text-gray-600 mt-1">{formatDate(booking.travel_date)}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`flex items-center px-3 py-1.5 rounded-lg border ${getStatusClass(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span className="font-medium">
                          {booking.status === 'confirmed' && 'Dikonfirmasi'}
                          {booking.status === 'paid' && 'Dibayar'}
                          {booking.status === 'pending' && 'Menunggu Pembayaran'}
                          {booking.status === 'cancelled' && 'Dibatalkan'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">ID Transaksi</p>
                          <p className="font-medium">{booking.transaction_id}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Pembayaran</p>
                          <p className="font-bold text-secondary">{formatCurrency(booking.total_price)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Kereta</p>
                          <p className="font-medium">{booking.train?.name} ({booking.train?.class_type})</p>
                          <p className="text-sm text-gray-500">{booking.train?.operator}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Penumpang</p>
                          <p className="font-medium">{booking.passenger_name}</p>
                          <p className="text-sm text-gray-500">Kursi {booking.seat_number}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-dashed pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-lg bg-gray-50 p-3">
                        <div className="flex">
                          <div className="mr-3 mt-1">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            <div className="w-0.5 h-14 bg-gray-300 mx-auto my-1"></div>
                            <div className="w-3 h-3 rounded-full bg-secondary"></div>
                          </div>
                          <div>
                            <div className="mb-3">
                              <p className="text-sm text-gray-500">Berangkat</p>
                              <p className="font-bold text-gray-800">{formatTime(booking.train?.departure_time || '')}</p>
                              <p className="text-sm text-gray-600">{booking.train?.departureStation?.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Tiba</p>
                              <p className="font-bold text-gray-800">{formatTime(booking.train?.arrival_time || '')}</p>
                              <p className="text-sm text-gray-600">{booking.train?.arrivalStation?.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        {booking.status === 'pending' && (
                          <Button
                            variant="primary"
                            className="w-full"
                            onClick={() => {
                              // Store booking for payment page
                              sessionStorage.setItem('currentBooking', JSON.stringify(booking));
                              sessionStorage.setItem('selectedTrain', JSON.stringify(booking.train));
                              router.push('/payment');
                            }}
                          >
                            <div className="flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                              <span>Bayar Sekarang</span>
                            </div>
                          </Button>
                        )}
                        
                        {booking.status === 'confirmed' && (
                          <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-gray-600">Tiket Anda telah dikonfirmasi</p>
                          </div>
                        )}
                        
                        {booking.status === 'paid' && (
                          <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            </div>
                            <p className="text-gray-600">Pembayaran Anda sedang diproses</p>
                          </div>
                        )}
                        
                        {booking.status === 'cancelled' && (
                          <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                            <p className="text-gray-600">Pemesanan ini telah dibatalkan</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
