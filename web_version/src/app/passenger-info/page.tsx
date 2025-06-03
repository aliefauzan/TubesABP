'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TripSummaryCard from '@/components/TripSummaryCard';
import { bookingService } from '@/utils/api';
import { Train } from '@/types';
import PassengerInfoSkeleton from '@/components/skeletons/PassengerInfoSkeleton';
import PassengerForm from '@/components/passenger-info/PassengerForm';

export default function PassengerInfoPage() {
  const router = useRouter();
  const [train, setTrain] = useState<Train | null>(null);
  const [travelDate, setTravelDate] = useState<string>('');
  const [selectedSeat, setSelectedSeat] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    passenger_name: '',
    passenger_id_number: '',
    passenger_dob: '',
    passenger_gender: 'male',
  });
  
  const [errors, setErrors] = useState<{
    passenger_name?: string;
    passenger_id_number?: string;
    passenger_dob?: string;
    passenger_gender?: string;
    general?: string;
  }>({});

  useEffect(() => {
    // Retrieve data from sessionStorage
    const storedTrain = sessionStorage.getItem('selectedTrain');
    const storedDate = sessionStorage.getItem('travelDate');
    const storedSeat = sessionStorage.getItem('selectedSeat');
    
    if (!storedTrain || !storedDate || !storedSeat) {
      router.push('/schedule');
      return;
    }
    
    setTrain(JSON.parse(storedTrain));
    setTravelDate(storedDate);
    setSelectedSeat(storedSeat);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!train) return;
    
    // Basic validation
    const newErrors: typeof errors = {};
    
    if (!formData.passenger_name.trim()) {
      newErrors.passenger_name = 'Nama penumpang wajib diisi';
    }
    
    if (!formData.passenger_id_number.trim()) {
      newErrors.passenger_id_number = 'Nomor identitas wajib diisi';
    }
    
    if (!formData.passenger_dob) {
      newErrors.passenger_dob = 'Tanggal lahir wajib diisi';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get user from localStorage (assuming user is logged in)
      const storedUser = localStorage.getItem('user');
      
      if (!storedUser) {
        router.push('/login');
        return;
      }      
      const user = JSON.parse(storedUser);
      
      const booking = await bookingService.createBooking({
        user_uuid: user.uuid,
        train_id: Number(train.id),
        travel_date: travelDate,
        passenger_name: formData.passenger_name,
        passenger_id_number: formData.passenger_id_number,
        passenger_dob: formData.passenger_dob,
        passenger_gender: formData.passenger_gender as 'male' | 'female',
        payment_method: 'transfer',
        seat_number: selectedSeat,
      });
      
      // Store booking info for payment page
      sessionStorage.setItem('currentBooking', JSON.stringify(booking));
      
      // Navigate to payment page
      router.push('/payment');
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Terjadi kesalahan. Silakan coba lagi.' });
      }
    } finally {
      setIsLoading(false);
    }
  };
  if (!train) {
    return <PassengerInfoSkeleton />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
          Isi Data Penumpang
        </h1>
          {/* Trip Summary */}
        <TripSummaryCard 
          train={train} 
          travelDate={travelDate} 
          selectedSeat={selectedSeat}
          showSeat={true}
          className="mb-8"
        />        
        {/* Passenger Form */}
        <PassengerForm
          formData={formData}
          errors={errors}
          isLoading={isLoading}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
