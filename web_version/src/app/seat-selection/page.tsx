'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { trainService } from '@/lib/api';
import { Train } from '@/types';
import { formatCurrency, formatDate, formatTime } from '@/utils/format';

export default function SeatSelectionPage() {
  const router = useRouter();
  const [train, setTrain] = useState<Train | null>(null);
  const [travelDate, setTravelDate] = useState<string>('');
  const [availableSeats, setAvailableSeats] = useState<string[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve train data from sessionStorage
    const storedTrain = sessionStorage.getItem('selectedTrain');
    const storedDate = sessionStorage.getItem('travelDate');
    
    if (!storedTrain || !storedDate) {
      router.push('/search');
      return;
    }
    
    const parsedTrain: Train = JSON.parse(storedTrain);
    setTrain(parsedTrain);
    setTravelDate(storedDate);
    
    const fetchAvailableSeats = async () => {
      try {
        const seats = await trainService.getAvailableSeats(parsedTrain.id, storedDate);
        setAvailableSeats(seats);
      } catch (error) {
        console.error('Error fetching available seats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAvailableSeats();
  }, [router]);

  const handleSeatClick = (seat: string) => {
    setSelectedSeat(seat);
  };

  const handleContinue = () => {
    if (!selectedSeat) {
      alert('Silakan pilih kursi terlebih dahulu.');
      return;
    }
    
    // Store selected seat in sessionStorage
    sessionStorage.setItem('selectedSeat', selectedSeat);
    
    // Navigate to passenger information page
    router.push('/passenger-info');
  };

  if (isLoading || !train) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg">Memuat informasi kursi...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Pilih Kursi Anda</h1>
          
          {/* Train Information Card */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold text-primary mb-2">{train.name}</h2>
                <p className="text-gray-600 mb-1">{train.operator} • {train.class_type}</p>
                <p className="text-gray-600 mb-4">Tanggal: {formatDate(travelDate)}</p>
                
                <div className="flex items-center mb-2">
                  <div className="w-16 font-medium text-right">{formatTime(train.departure_time)}</div>
                  <div className="mx-3 w-3 h-3 bg-primary rounded-full"></div>
                  <div>{train.departureStation?.name}, {train.departureStation?.city}</div>
                </div>
                
                <div className="flex items-center mb-1">
                  <div className="w-16 font-medium text-right"></div>
                  <div className="mx-3 border-l-2 border-dashed border-gray-300 h-8"></div>
                  <div></div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-16 font-medium text-right">{formatTime(train.arrival_time)}</div>
                  <div className="mx-3 w-3 h-3 bg-secondary rounded-full"></div>
                  <div>{train.arrivalStation?.name}, {train.arrivalStation?.city}</div>
                </div>
              </div>
              
              <div className="flex flex-col justify-center md:text-right">
                <p className="text-2xl font-bold text-secondary mb-2">
                  {formatCurrency(train.price)}
                </p>
                <p className="text-gray-600">
                  {availableSeats.length} kursi tersedia
                </p>
              </div>
            </div>
          </div>
          
          {/* Seat Selection */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-xl font-bold mb-6 text-center">Pilih Kursi Anda</h3>
            
            {availableSeats.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
                <p className="text-center">Tidak ada kursi yang tersedia untuk kereta ini. Silakan pilih kereta lain.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-6 mb-4">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gray-200 rounded-md mr-2"></div>
                      <span className="text-sm">Tersedia</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-primary rounded-md mr-2"></div>
                      <span className="text-sm">Dipilih</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gray-400 rounded-md mr-2"></div>
                      <span className="text-sm">Tidak Tersedia</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-b border-gray-200 py-4 mb-4">
                    <div className="flex justify-center mb-4">
                      <div className="w-2/3 h-10 bg-gray-300 rounded-t-lg text-center flex items-center justify-center text-gray-600 font-medium">
                        DEPAN KERETA
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 md:grid-cols-10 gap-3 mb-6 max-w-3xl mx-auto">
                      {availableSeats.map((seat) => (
                        <button
                          key={seat}
                          className={`p-2 border rounded-md text-center transition-all transform hover:scale-105 ${
                            selectedSeat === seat
                              ? 'bg-primary text-white border-primary shadow-md'
                              : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-primary/20'
                          }`}
                          onClick={() => handleSeatClick(seat)}
                        >
                          {seat}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="w-2/3 h-10 bg-gray-300 rounded-b-lg text-center flex items-center justify-center text-gray-600 font-medium">
                        BELAKANG KERETA
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    {selectedSeat && (
                      <p className="font-medium text-center md:text-left">
                        Kursi Dipilih: <span className="text-primary font-bold">{selectedSeat}</span>
                      </p>
                    )}
                  </div>
                  <Button
                    variant="primary"
                    onClick={handleContinue}
                    disabled={!selectedSeat}
                    className="w-full md:w-auto"
                  >
                    Lanjutkan
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
