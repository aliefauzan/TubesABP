'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowRight, FiCalendar, FiClock, FiUsers, FiChevronRight } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import { trainService, stationService, authService } from '@/utils/api';
import { Train, Station } from '@/types';
import theme from '@/utils/theme';

export default function SchedulePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [trains, setTrains] = useState<Train[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [departureStationId, setDepartureStationId] = useState<number | null>(null);
  const [arrivalStationId, setArrivalStationId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const departure = searchParams.get('departure');
    const arrival = searchParams.get('arrival');
    const date = searchParams.get('date');

    if (departure && arrival && date) {
      setDepartureStationId(Number(departure));
      setArrivalStationId(Number(arrival));
      setSelectedDate(new Date(date).toISOString().split('T')[0]); // Format as YYYY-MM-DD
      
      fetchStations();
      searchTrains(Number(departure), Number(arrival), new Date(date));
    } else {
      setError('Parameter pencarian tidak lengkap');
      setIsLoading(false);
    }
  }, [searchParams]);

  const fetchStations = async () => {
    try {
      const response = await stationService.getAllStations();
      if (response && Array.isArray(response)) {
        setStations(response);
      }
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const searchTrains = async (departureId: number, arrivalId: number, date: Date) => {
    setIsLoading(true);
    try {
      const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      const response = await trainService.searchTrains({
        departure_station_id: departureId,
        arrival_station_id: arrivalId,
        date: formattedDate,
      });

      if (response && Array.isArray(response)) {
        setTrains(response);
      } else {
        setTrains([]);
      }
    } catch (error) {
      console.error('Error searching trains:', error);
      setError('Terjadi kesalahan saat mencari jadwal kereta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTrain = (train: Train) => {
    const isLoggedIn = authService.isLoggedIn();
    
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    router.push(`/seats?train_id=${train.id}&date=${selectedDate}`);
  };

  // Find station names for display
  const getDepartureStationName = () => {
    const station = stations.find(s => s.id === departureStationId);
    return station ? `${station.name}` : 'Loading...';
  };

  const getArrivalStationName = () => {
    const station = stations.find(s => s.id === arrivalStationId);
    return station ? `${station.name}` : 'Loading...';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Summary */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex-1">
              <div className="flex items-center">
                <div className="font-bold">{getDepartureStationName()}</div>
                <FiArrowRight className="mx-2" />
                <div className="font-bold">{getArrivalStationName()}</div>
              </div>
              <div className="flex items-center mt-2 text-gray-600 text-sm">
                <FiCalendar className="mr-1" />
                {selectedDate && formatDate(selectedDate)}
              </div>
            </div>
            <button
              onClick={() => router.push('/')}
              className="mt-3 md:mt-0 px-4 py-2 text-sm border rounded-md"
              style={{ borderColor: theme.primaryColor, color: theme.primaryColor }}
            >
              Ubah Pencarian
            </button>
          </div>
        </div>

        {/* Train List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold">Jadwal Kereta</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2" style={{ borderColor: theme.primaryColor }}></div>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">
              {error}
            </div>
          ) : trains.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              Tidak ada jadwal kereta yang tersedia untuk rute dan tanggal yang dipilih
            </div>
          ) : (
            <div className="divide-y">
              {trains.map((train) => (
                <div key={train.id} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-3 md:mb-0">
                      <h3 className="font-bold">{train.name}</h3>
                      <div className="text-sm text-gray-600">{train.classType}</div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-8">
                      <div className="text-center mb-3 md:mb-0">
                        <div className="font-bold">{train.time}</div>
                        <div className="text-sm text-gray-600">{train.departureStationName}</div>
                      </div>
                      
                      <div className="flex flex-col items-center mb-3 md:mb-0">
                        <div className="text-xs text-gray-500">{train.duration}</div>
                        <div className="border-t border-gray-300 w-16 my-1"></div>
                        <div className="flex items-center text-xs text-gray-500">
                          <FiClock className="mr-1" />
                          <span>Langsung</span>
                        </div>
                      </div>
                      
                      <div className="text-center mb-3 md:mb-0">
                        <div className="font-bold">{train.arrivalTime}</div>
                        <div className="text-sm text-gray-600">{train.arrivalStationName}</div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="font-bold" style={{ color: theme.primaryColor }}>
                          {train.price}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <FiUsers className="mr-1" />
                          <span>{train.seatsLeft} kursi tersedia</span>
                        </div>
                        
                        <button
                          onClick={() => handleSelectTrain(train)}
                          className="mt-2 px-4 py-2 rounded-md text-white flex items-center text-sm"
                          style={{ backgroundColor: theme.primaryColor }}
                        >
                          Pilih <FiChevronRight className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 