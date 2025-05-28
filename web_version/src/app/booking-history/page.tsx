'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { bookingService } from '@/utils/api'; // Assuming a similar service structure
import { Booking, Train } from '@/types'; // Assuming similar types
import { formatCurrency, formatDate, formatTime } from '@/utils/format';
import { FiRefreshCw, FiFilter, FiAlertCircle, FiCheckCircle, FiClock, FiInfo } from 'react-icons/fi';
import theme from '@/utils/theme';

// Mock train data for display purposes, as the Flutter version constructs it
const createMockTrainFromBooking = (booking: Booking): Train => {
  const trainData = booking.train; // Access the nested train object

  // Determine a base date string for combining with time parts
  // Prefer trainData.departure_time (or similar) if it's a full date string, or construct from parts
  const baseDateStr = trainData?.departure_time && !isNaN(new Date(trainData.departure_time).getTime()) 
                      ? new Date(trainData.departure_time).toISOString().split('T')[0] // 'YYYY-MM-DD'
                      : new Date().toISOString().split('T')[0]; // Fallback to today's date part

  let timePart = trainData?.departure_time ? new Date(trainData.departure_time).toTimeString().split(' ')[0] : '00:00:00';
  if (timePart.match(/^\\d{2}:\\d{2}$/)) { // If HH:mm
    timePart += ':00'; // Append seconds
  } else if (!timePart.match(/^\\d{2}:\\d{2}:\\d{2}$/)) { // If not HH:mm:ss
    timePart = '00:00:00'; // Default to midnight if format is unexpected
  }
  
  const trainDepartureDateTimeStr = `${baseDateStr}T${timePart}Z`; 
  const trainArrivalDateTimeStr = trainData?.arrival_time && !isNaN(new Date(trainData.arrival_time).getTime()) 
                                  ? trainData.arrival_time 
                                  : trainDepartureDateTimeStr; // Fallback for arrival time

  return {
    id: trainData?.id?.toString() || booking.train_id?.toString() || Math.random().toString(),
    name: trainData?.name || 'N/A',
    operator: trainData?.operator || 'N/A',
    
    date: trainDepartureDateTimeStr, // Used by formatDate for departure date
    time: trainDepartureDateTimeStr, // Used by formatTime for departure time

    departure: trainData?.departure_station?.name || 'N/A',
    arrival: trainData?.arrival_station?.name || 'N/A',
    arrivalTime: trainData?.arrival_time || 'N/A', // Raw arrival time string from backend
    duration: trainData?.travel_time || 'N/A', 
    classType: booking.seatClass || trainData?.classType || 'N/A', // Prefer booking specific, then train, then fallback
    price: trainData?.price || '0', // This is TRAIN's price, booking.total_price is for the whole booking
    seatsLeft: trainData?.available_seats || 0, 
    departureStationName: trainData?.departure_station?.name || 'N/A', 
    arrivalStationName: trainData?.arrival_station?.name || 'N/A', 
    train_number: trainData?.train_number || 'N/A',
    // Ensure all fields expected by the Train interface are covered
  };
};

export default function BookingHistoryPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('Semua');
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, you'd get the user ID from auth state
      // For now, let's assume the bookingService handles user context or uses a stored UUID
      const user = localStorage.getItem('user');
      if (!user) {
        setError("Anda harus login untuk melihat riwayat.");
        // router.push('/login'); // Optional: redirect to login
        setIsLoading(false);
        return;
      }
      const userData = JSON.parse(user);
      const data = await bookingService.getBookingHistory(userData.uuid || userData.id); // Use UUID or ID based on your user object
      
      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        console.warn('Booking history data is not an array:', data);
        setBookings([]); // Set to empty array if data is not as expected
      }
    } catch (err: any) {
      console.error('Failed to fetch booking history:', err);
      if (err.response?.status === 401) {
        setError("Sesi Anda telah berakhir atau Anda tidak diautentikasi. Silakan login kembali.");
        // Optionally, redirect to login after a delay or provide a login button
        // setTimeout(() => router.push('/login'), 3000);
      } else {
        setError(err.message || 'Gagal memuat riwayat pemesanan.');
      }
      setBookings([]); // Clear bookings on error
    } finally {
      setIsLoading(false);
    }
  }, [router]);

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
    : bookings.filter(booking => booking.status.toLowerCase() === selectedStatusFilter.toLowerCase());

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
      )}

      {!isLoading && !error && filteredBookings.length === 0 && (
        <div className="text-center py-10">
          <img src="/images/empty-box.svg" alt="Tidak ada data" className="mx-auto mb-4 w-40 h-40" />
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
      )}

      {!isLoading && !error && filteredBookings.length > 0 && (
        <div className="space-y-6">
          {filteredBookings.map((booking) => {
            const train = createMockTrainFromBooking(booking); // Create mock train for card
            return (
              <div key={booking.transactionId} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
                <div className={`p-5 border-l-4 ${booking.status === 'pending' ? 'border-yellow-500' : booking.status === 'confirmed' || booking.status === 'paid' ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                    <div>
                      <h2 className="text-xl font-semibold text-primary">{train.name}</h2>
                      <p className="text-sm text-gray-500">Operator: {train.operator}</p>
                    </div>
                    <div className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : 'Tidak Diketahui'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">ID Transaksi:</p>
                      <p className="font-medium text-gray-700">{booking.transaction_id || booking.transactionId}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Tanggal:</p>
                      <p className="font-medium text-gray-700">{formatDate(train.date)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Waktu:</p>
                      <p className="font-medium text-gray-700">{formatTime(train.time)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Rute:</p>
                      <p className="font-medium text-gray-700">{train.departure} → {train.arrival}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Kelas:</p>
                      <p className="font-medium text-gray-700">{train.classType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Harga:</p>
                      <p className="font-bold text-lg text-green-600">{formatCurrency(Number(booking.total_price) || 0)}</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-3">
                    Dipesan pada: {booking.created_at && !isNaN(new Date(booking.created_at).getTime()) ? `${formatDate(booking.created_at)} ${formatTime(booking.created_at)}` : 'Tanggal tidak tersedia'}
                  </div>

                  {booking.passenger_name && ( // Changed from passengerId to passenger_name for display
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Penumpang:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        <li>{booking.passenger_name} (ID: {booking.passenger_id_card || 'N/A'}, Kursi: {booking.seat_number || 'N/A'})</li>
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-3 border-t border-gray-200">
                    {booking.status.toLowerCase() === 'pending' && (
                      <Button 
                        onClick={() => router.push(`/payment?bookingId=${booking.transaction_id || booking.transactionId}`)} 
                        variant="primary"
                        size="sm"
                        disabled={isLoadingAction}
                      >
                        Lanjutkan Pembayaran
                      </Button>
                    )}
                     {(booking.status.toLowerCase() === 'confirmed' || booking.status.toLowerCase() === 'paid') && (
                       <Button 
                        onClick={() => alert(`Fitur download tiket untuk ${booking.transaction_id || booking.transactionId} belum tersedia.`)} 
                        variant="outline"
                        size="sm"
                      >
                        Download Tiket
                      </Button>
                    )}
                    {/* Placeholder for other actions like cancel, rebook, etc. */}
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
