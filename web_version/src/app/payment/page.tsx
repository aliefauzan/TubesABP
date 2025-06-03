'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TripSummaryCard from '@/components/TripSummaryCard';
import { bookingService } from '@/utils/api';
import { Train } from '@/types';
import { formatCurrency } from '@/utils/format';
import PaymentSkeleton from '@/components/skeletons/PaymentSkeleton';
import TransactionIdDisplay from '@/components/payment/TransactionIdDisplay';
import PaymentInstructions from '@/components/payment/PaymentInstructions';
import PaymentErrorDisplay from '@/components/payment/PaymentErrorDisplay';
import PaymentActionButtons from '@/components/payment/PaymentActionButtons';

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [booking, setBooking] = useState<any>(null);
  const [train, setTrain] = useState<Train | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadBookingData = async () => {
      try {
        const bookingId = searchParams.get('bookingId');
        
        if (bookingId) {
          // Load from booking history via transaction ID
          const user = localStorage.getItem('user');
          if (!user) {
            router.push('/login');
            return;
          }
          
          const userData = JSON.parse(user);
          const bookingHistory = await bookingService.getBookingHistory(userData.uuid || userData.id);
          
          // Find the booking by transaction_id
          const foundBooking = bookingHistory.find((b: any) => b.transaction_id === bookingId);
          if (!foundBooking) {
            setError('Booking tidak ditemukan');
            setIsLoading(false);
            return;
          }          console.log('Found booking from history:', foundBooking);
          setBooking(foundBooking);
          if (foundBooking.train) {
            setTrain(foundBooking.train);
          }
        } else {
          // Load from sessionStorage (new booking flow)
          const storedBooking = sessionStorage.getItem('currentBooking');
          const storedTrain = sessionStorage.getItem('selectedTrain');
          
          if (!storedBooking || !storedTrain) {
            router.push('/schedule');
            return;
          }
          
          const parsedBooking = JSON.parse(storedBooking);
          const parsedTrain = JSON.parse(storedTrain);
            console.log('Loaded booking from sessionStorage:', parsedBooking);
          console.log('Loaded train from sessionStorage:', parsedTrain);
          console.log('Transaction ID from booking:', parsedBooking.transaction_id);
          console.log('Available booking keys:', Object.keys(parsedBooking));
          
          setBooking(parsedBooking);
          setTrain(parsedTrain);
        }
      } catch (error) {
        console.error('Error loading booking data:', error);
        setError('Gagal memuat data pemesanan');
      } finally {
        setIsLoading(false);
      }
    };

    loadBookingData();
  }, [router, searchParams]);// Hardcoded payment confirmation like in Flutter
  const handleConfirmPayment = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setError(null);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        setError('Anda belum login. Silakan login terlebih dahulu.');
        return;
      }
        const transactionId = booking.transaction_id || booking.transactionId || booking.id;
      if (!transactionId) {
        setError('ID transaksi tidak ditemukan. Silakan coba lagi.');
        return;
      }
      
      // Update booking status to 'confirmed' - hardcoded like Flutter
      await bookingService.updateBookingStatus(transactionId, 'confirmed');
      
      // Navigate to success page
      router.push('/payment-success');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Gagal mengonfirmasi pembayaran';
      setError(`Gagal mengonfirmasi pembayaran: ${errorMessage}. Silakan coba lagi.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOrderOtherTicket = () => {
    router.push('/schedule');
  };

  const handleDownloadTicket = () => {
    // Placeholder for download functionality
    alert('Fitur download tiket akan segera tersedia');
  };

  if (isLoading || !booking || !train) {
    return <PaymentSkeleton />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
          Konfirmasi Pembayaran
        </h1>
          {/* Booking Summary */}
        <TripSummaryCard 
          train={train} 
          travelDate={booking.travel_date || (typeof window !== 'undefined' && sessionStorage.getItem('travelDate')) || new Date().toISOString()}
          selectedSeat={booking.seat_number || (typeof window !== 'undefined' && sessionStorage.getItem('selectedSeat')) || 'N/A'}
          showSeat={true}
          className="mb-8"
        />        
        {/* Transaction ID - separate card */}
        <TransactionIdDisplay 
          transactionId={booking.transaction_id || booking.transactionId || booking.id || ''}
        />

        {/* Payment Instructions */}
        <PaymentInstructions
          transactionId={booking.transaction_id || booking.transactionId || booking.id || ''}
          totalAmount={formatCurrency(Number(booking.total_price || booking.price || train.price?.replace(/[^0-9]/g, '') || 0))}
        />

        {/* Error Display */}
        {error && <PaymentErrorDisplay error={error} />}

        {/* Action Buttons - Flutter Style */}
        <PaymentActionButtons
          isProcessing={isProcessing}
          onConfirmPayment={handleConfirmPayment}
          onOrderOtherTicket={handleOrderOtherTicket}
          onDownloadTicket={handleDownloadTicket}
        />
      </div>
  </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentSkeleton />}>
      <PaymentPageContent />
    </Suspense>
  );
}