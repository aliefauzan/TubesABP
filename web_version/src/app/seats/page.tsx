'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { trainService, stationService } from '@/utils/api';
import { Train, Station } from '@/types';
import theme from '@/utils/theme';

function SeatsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [train, setTrain] = useState<Train | null>(null);
  const [availableSeats, setAvailableSeats] = useState<string[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stations, setStations] = useState<Station[]>([]);
  
  useEffect(() => {
    const trainId = searchParams.get('train_id');
    const date = searchParams.get('date');
    
    if (!trainId || !date) {
      setError('Parameter tidak lengkap');
      setIsLoading(false);
      return;
    }
    
    fetchData(Number(trainId), date);
  }, [searchParams]);
  
  const fetchData = async (trainId: number, date: string) => {
    setIsLoading(true);
    try {
      // Fetch stations for reference
      const stationsResponse = await stationService.getAllStations();
      if (stationsResponse && Array.isArray(stationsResponse)) {
        setStations(stationsResponse);
      }
      
      // Fetch all trains to find the selected one
      const trainsResponse = await trainService.getAllTrains();
      if (trainsResponse && Array.isArray(trainsResponse)) {
        const foundTrain = trainsResponse.find(t => t.id === trainId);
        if (foundTrain) {
          setTrain(foundTrain);
          
          // Fetch available seats for this train
          const seatsResponse = await trainService.getAvailableSeats(trainId);
          if (seatsResponse && Array.isArray(seatsResponse)) {
            setAvailableSeats(seatsResponse);
          }
        } else {
          setError('Kereta tidak ditemukan');
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Terjadi kesalahan saat memuat data');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleSelectSeat = (seat: string) => {
    setSelectedSeat(seat);
  };
  const handleContinue = () => {
    if (!train || !selectedSeat) return;
    
    // Store train data and seat selection in session storage
    sessionStorage.setItem('selectedTrain', JSON.stringify(train));
    sessionStorage.setItem('travelDate', searchParams.get('date') || '');
    sessionStorage.setItem('selectedSeat', selectedSeat);
    
    // Navigate to passenger information page
    router.push('/passenger-info');
  };
  
  const getDepartureStationName = () => {
    if (!train) return 'Loading...';
    const station = stations.find(s => s.id === train.departure_station_id);
    return station ? `${station.name} (${station.code})` : 'Loading...';
  };

  const getArrivalStationName = () => {
    if (!train) return 'Loading...';
    const station = stations.find(s => s.id === train.arrival_station_id);
    return station ? `${station.name} (${station.code})` : 'Loading...';
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2" style={{ borderColor: theme.primaryColor }}></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-md p-6 text-center text-red-600">
            {error}
            <div className="mt-4">
              <button 
                onClick={() => router.back()}
                className="px-4 py-2 border rounded-md"
              >
                Kembali
              </button>
            </div>
          </div>
        ) : train ? (
          <>            {/* Train Info */}
            <div className="bg-white rounded-xl shadow-card p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-3 md:mb-0">
                  <h1 className="text-xl font-bold">{train.name}</h1>
                  <div className="text-sm text-gray-600">{train.train_number}</div>
                </div>
                <div className="flex items-center">                  <div className="text-right mr-3">
                    <div className="font-bold">{train.departure_time?.substring(0, 5) || train.time}</div>
                    <div className="text-sm text-gray-600">{getDepartureStationName()}</div>
                  </div>
                  <FiArrowRight className="mx-2" />
                  <div className="text-left ml-3">
                    <div className="font-bold">{train.arrival_time?.substring(0, 5) || train.arrivalTime}</div>
                    <div className="text-sm text-gray-600">{getArrivalStationName()}</div>
                  </div>
                </div>                <div className="mt-3 md:mt-0">
                  <div className="font-bold" style={{ color: theme.primaryColor }}>
                    {train.price}
                  </div>
                </div>
              </div>
            </div>
              {/* Seat Selection */}
            <div className="bg-white rounded-xl shadow-card overflow-hidden mb-6">
              <div className="p-4 border-b">
                <h2 className="text-lg font-bold">Pilih Kursi</h2>
                <p className="text-sm text-gray-600">Silakan pilih kursi yang tersedia</p>
              </div>
              
              <div className="p-6">
                <div className="mb-4 flex items-center">
                  <div className="w-6 h-6 bg-gray-200 rounded-md mr-2"></div>
                  <span className="text-sm text-gray-600">Tidak Tersedia</span>
                  
                  <div className="w-6 h-6 bg-white border border-gray-300 rounded-md ml-6 mr-2"></div>
                  <span className="text-sm text-gray-600">Tersedia</span>
                  
                  <div className="w-6 h-6 rounded-md ml-6 mr-2" style={{ backgroundColor: theme.primaryColor }}></div>
                  <span className="text-sm text-gray-600">Dipilih</span>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 mt-6">
                  {/* Simplified Seat Layout */}
                  <div className="flex justify-center mb-8">
                    <div className="w-24 h-10 bg-gray-800 rounded-t-lg flex items-center justify-center text-white text-sm">
                      DEPAN
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-3xl mx-auto">
                    {Array.from({length: 40}).map((_, index) => {
                      const seatNumber = `${String.fromCharCode(65 + Math.floor(index / 10))}${(index % 10) + 1}`;
                      const isAvailable = availableSeats.includes(seatNumber);
                      const isSelected = seatNumber === selectedSeat;
                      
                      return (
                        <button
                          key={seatNumber}
                          disabled={!isAvailable}
                          onClick={() => handleSelectSeat(seatNumber)}
                          className={`
                            w-14 h-14 rounded-lg flex items-center justify-center relative
                            ${!isAvailable ? 'bg-gray-200 cursor-not-allowed' : ''}
                            ${isSelected ? 'text-white' : 'text-gray-700'}
                          `}
                          style={{
                            backgroundColor: isSelected ? theme.primaryColor : isAvailable ? 'white' : '',
                            border: isAvailable && !isSelected ? '1px solid #e0e0e0' : 'none'
                          }}
                        >
                          {seatNumber}
                          {isSelected && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <FiCheck className="text-white text-xs" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg md:relative md:shadow-none md:p-0">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold">
                  Kursi dipilih: <span style={{ color: theme.primaryColor }}>{selectedSeat || '-'}</span>
                </div>
                <button
                  onClick={handleContinue}
                  disabled={!selectedSeat}
                  className={`px-6 py-3 rounded-md text-white ${!selectedSeat ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          </>        ) : null}
    </div>
  );
}

export default function SeatsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div></div>}>
      <SeatsPageContent />
    </Suspense>
  );
}