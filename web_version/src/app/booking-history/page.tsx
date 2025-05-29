'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import { bookingService } from '@/utils/api';
import { Train } from '@/types';
import { formatCurrency, formatDate, formatTime } from '@/utils/format';
import { FiRefreshCw, FiFilter, FiAlertCircle, FiCheckCircle, FiClock, FiInfo } from 'react-icons/fi';

// Create train display data from booking, exactly like Flutter implementation
const createTrainFromBooking = (booking: any): Train => {
  const train = booking.train || {};
  const departureStation = train.departure_station || {};
  const arrivalStation = train.arrival_station || {};

  // Status handling (matching Flutter: displayStatus = statusFromServer.isEmpty ? 'pending' : statusFromServer)
  const statusFromServer = booking.status?.toString() || '';
  const displayStatus = statusFromServer === '' ? 'pending' : statusFromServer;

  // Create full datetime strings for compatibility with format functions
  const fullDepartureDateTime = train.departure_time || new Date().toISOString();
  const fullArrivalDateTime = train.arrival_time || new Date().toISOString();

  return {
    id: train.id?.toString() || booking.train_id?.toString() || Math.random().toString(),
    name: train.name || '',
    operator: train.operator || '',
    
    date: fullDepartureDateTime, // For formatDate function
    time: fullDepartureDateTime, // For formatTime function
    
    departure: departureStation.name || '',
    arrival: arrivalStation.name || '',
    arrivalTime: fullArrivalDateTime,
    duration: train.travel_time || '', 
    classType: train.class_type || '',
    price: train.price?.toString() || '0',
    seatsLeft: train.available_seats || 0, 
    departureStationName: departureStation.name || '', 
    arrivalStationName: arrivalStation.name || '', 
    train_number: train.train_number || '',
  };
};

export default function BookingHistoryPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('Semua');
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Get user data
      const user = localStorage.getItem('user');
      if (!user) {
        setError("Anda harus login untuk melihat riwayat.");
        setIsLoading(false);
        return;
      }
      
      const userData = JSON.parse(user);
      
      // Fetch booking history - should include nested train data like Flutter
      const bookingData = await bookingService.getBookingHistory(userData.uuid || userData.id);
      
      // Log the response to debug
      console.log('Booking history response:', bookingData);
      
      // Ensure data is an array
      if (Array.isArray(bookingData)) {
        setBookings(bookingData);
      } else {
        console.warn('Booking history data is not an array:', bookingData);
        setBookings([]);
      }
    } catch (err: any) {
      console.error('Failed to fetch booking history:', err);
      if (err.response?.status === 401) {
        setError("Sesi Anda telah berakhir atau Anda tidak diautentikasi. Silakan login kembali.");
      } else {
        setError(err.message || 'Gagal memuat riwayat pemesanan.');
      }
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleRefresh = () => {
    fetchBookings();
  };

  const handleUploadProof = async (transactionId: string | number) => {
    setIsLoadingAction(true);
    try {
      // This is a placeholder. In a real app, you'd likely open a modal
      // for file upload and then call an update status endpoint.
      // The Flutter app directly updates status to 'confirmed' which might be an admin action.
      // For user-uploaded proof, the flow would be: upload -> status: 'pending_confirmation' or similar.
      // Here, we'll mimic the Flutter app's direct 'confirmed' update for simplicity.
      await bookingService.updateBookingStatus(transactionId.toString(), 'confirmed');
      alert('Status booking berhasil diubah menjadi confirmed (simulasi).');
      fetchBookings(); // Refresh list
    } catch (err: any) {
      console.error('Failed to update booking status:', err);
      alert('Gagal mengubah status booking: ' + (err.message || 'Error tidak diketahui'));
    } finally {
      setIsLoadingAction(false);
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'confirmed':
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-700';
      case 'expired':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <FiClock className="mr-2" />;
      case 'confirmed':
      case 'paid':
        return <FiCheckCircle className="mr-2" />;
      case 'cancelled':
      case 'failed':
      case 'expired':
        return <FiAlertCircle className="mr-2" />;
      default:
        return <FiInfo className="mr-2" />;
    }
  };

  const filteredBookings = selectedStatusFilter === 'Semua'
    ? bookings
    : bookings.filter(booking => {
        const statusFromServer = booking.status?.toString() || '';
        const displayStatus = statusFromServer === '' ? 'pending' : statusFromServer;
        return displayStatus.toLowerCase() === selectedStatusFilter.toLowerCase();
      });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <FiRefreshCw className="animate-spin text-4xl text-primary mb-4" />
        <p className="text-lg text-gray-600">Memuat riwayat pemesanan...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Riwayat Pemesanan</h1>
        <div className="flex items-center space-x-2">
          <Button onClick={handleRefresh} variant="outline" className="flex items-center">
            <FiRefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} /> Segarkan
          </Button>
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white"
            >
              {['Semua', 'pending', 'confirmed', 'paid', 'cancelled', 'expired'].map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-md bg-red-50 text-red-700 border border-red-200 flex items-center">
          <FiAlertCircle className="text-xl mr-3" />
          <div>
            <p className="font-semibold">Gagal Memuat Data</p>
            <p>{error}</p>
            {error.includes("login") && (
                 <Button onClick={() => router.push('/login')} variant="secondary" size="sm" className="mt-2">
                    Login Sekarang
                 </Button>
            )}
          </div>
        </div>
      )}      {!isLoading && !error && filteredBookings.length === 0 && (
        <div className="text-center py-10">
          <div className="mx-auto mb-4 w-40 h-40 relative">
            <Image 
              src="/images/empty-box.svg" 
              alt="Tidak ada data" 
              fill
              className="object-contain"
            />
          </div>
          <p className="text-xl text-gray-500">
            {selectedStatusFilter === 'Semua'
              ? 'Tidak ada riwayat pemesanan.'
              : `Tidak ada riwayat dengan status "${selectedStatusFilter}".`}
          </p>
          {selectedStatusFilter !== 'Semua' && (
             <Button onClick={() => setSelectedStatusFilter('Semua')} variant="outline" className="mt-2">
                Tampilkan Semua
             </Button>
          )}
        </div>
      )}      {!isLoading && !error && filteredBookings.length > 0 && (
        <div className="space-y-6">
          {filteredBookings.map((booking) => {
            // Log each booking to debug
            console.log('Processing booking:', booking);
            
            const train = createTrainFromBooking(booking);
            const statusFromServer = booking.status?.toString() || '';
            const displayStatus = statusFromServer === '' ? 'pending' : statusFromServer;
            
            return (
              <div key={booking.transaction_id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
                <div className={`p-5 border-l-4 ${displayStatus === 'pending' ? 'border-yellow-500' : displayStatus === 'confirmed' || displayStatus === 'paid' ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                    <div>
                      <h2 className="text-xl font-semibold text-primary">{train.name || 'Train Name N/A'}</h2>
                      <p className="text-sm text-gray-500">Operator: {train.operator || 'Operator N/A'}</p>
                    </div>
                    <div className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(displayStatus)}`}>
                      {getStatusIcon(displayStatus)}
                      {displayStatus ? displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1) : 'Tidak Diketahui'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">ID Transaksi:</p>
                      <p className="font-medium text-gray-700">{booking.transaction_id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Tanggal:</p>
                      <p className="font-medium text-gray-700">{booking.travel_date || 'Tanggal tidak tersedia'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Waktu:</p>
                      <p className="font-medium text-gray-700">
                        {train.time && formatTime(train.time) !== 'Invalid Date' ? formatTime(train.time) : 'Waktu tidak tersedia'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Rute:</p>
                      <p className="font-medium text-gray-700">{train.departure || 'N/A'} → {train.arrival || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Kelas:</p>
                      <p className="font-medium text-gray-700">{train.classType || 'Kelas tidak tersedia'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Harga:</p>
                      <p className="font-bold text-lg text-green-600">{formatCurrency(Number(booking.total_price) || 0)}</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-3">
                    Dipesan pada: {booking.created_at && !isNaN(new Date(booking.created_at).getTime()) ? `${formatDate(booking.created_at)} ${formatTime(booking.created_at)}` : 'Tanggal tidak tersedia'}
                  </div>

                  {booking.passenger_name && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Penumpang:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        <li>{booking.passenger_name} (ID: {booking.passenger_id_number || 'N/A'}, Kursi: {booking.seat_number || 'N/A'})</li>
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-3 border-t border-gray-200">
                    {displayStatus.toLowerCase() === 'pending' && (
                      <Button 
                        onClick={() => router.push(`/payment?bookingId=${booking.transaction_id}`)} 
                        variant="primary"
                        size="sm"
                        disabled={isLoadingAction}
                      >
                        Lanjutkan Pembayaran
                      </Button>
                    )}
                     {(displayStatus.toLowerCase() === 'confirmed' || displayStatus.toLowerCase() === 'paid') && (
                       <Button 
                        onClick={() => alert(`Fitur download tiket untuk ${booking.transaction_id} belum tersedia.`)} 
                        variant="outline"
                        size="sm"
                      >
                        Download Tiket
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
