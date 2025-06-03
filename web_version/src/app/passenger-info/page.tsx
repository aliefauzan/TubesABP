'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import TripSummaryCard from '@/components/TripSummaryCard';
import { bookingService } from '@/utils/api';
import { Train } from '@/types';
import PassengerInfoSkeleton from '@/components/skeletons/PassengerInfoSkeleton';

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
        
        {/* Passenger Form */}        <div className="bg-white p-6 rounded-xl shadow-card">
          <h2 className="text-xl font-bold mb-6 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Detail Penumpang
          </h2>
          
          {errors.general && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p>{errors.general}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="passenger_name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap Penumpang
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="passenger_name"
                  name="passenger_name"
                  type="text"
                  placeholder="Masukkan nama lengkap sesuai KTP/Paspor"
                  value={formData.passenger_name}
                  onChange={handleChange}
                  className={`pl-10 block w-full rounded-lg border ${
                    errors.passenger_name ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'
                  } py-3 shadow-sm`}
                  required
                />
              </div>
              {errors.passenger_name && (
                <p className="mt-1 text-sm text-red-600">{errors.passenger_name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="passenger_id_number" className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Identitas (KTP/Paspor)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <input
                  id="passenger_id_number"
                  name="passenger_id_number"
                  type="text"
                  placeholder="Masukkan nomor identitas"
                  value={formData.passenger_id_number}
                  onChange={handleChange}
                  className={`pl-10 block w-full rounded-lg border ${
                    errors.passenger_id_number ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'
                  } py-3 shadow-sm`}
                  required
                />
              </div>
              {errors.passenger_id_number && (
                <p className="mt-1 text-sm text-red-600">{errors.passenger_id_number}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="passenger_dob" className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Lahir
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="passenger_dob"
                    name="passenger_dob"
                    type="date"
                    value={formData.passenger_dob}
                    onChange={handleChange}
                    className={`pl-10 block w-full rounded-lg border ${
                      errors.passenger_dob ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'
                    } py-3 shadow-sm`}
                    required
                  />
                </div>
                {errors.passenger_dob && (
                  <p className="mt-1 text-sm text-red-600">{errors.passenger_dob}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="passenger_gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Kelamin
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <select
                    id="passenger_gender"
                    name="passenger_gender"
                    value={formData.passenger_gender}
                    onChange={handleChange}
                    className={`pl-10 block w-full rounded-lg border ${
                      errors.passenger_gender ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'
                    } py-3 shadow-sm`}
                    required
                  >
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                </div>
                {errors.passenger_gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.passenger_gender}</p>
                )}              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 mt-6 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                className="w-full md:w-auto py-3 px-8"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Memproses...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>Lanjut ke Pembayaran</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
