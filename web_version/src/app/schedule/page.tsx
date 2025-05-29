'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowRight, FiUsers, FiChevronRight } from 'react-icons/fi';
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
  const [showAllTrains, setShowAllTrains] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [trainClassFilter, setTrainClassFilter] = useState('Semua');

  const fetchStations = useCallback(async () => {
    try {
      const response = await stationService.getAllStations();
      if (response && Array.isArray(response)) {
        setStations(response);
      }
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  }, []);

  const fetchAllTrains = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await trainService.getAllTrains();
      if (response && response.trains && Array.isArray(response.trains)) {
        const transformedTrains = response.trains.map((train: any) => ({
          id: train.id,
          name: train.name || '',
          operator: train.operator || '',
          classType: train.class_type || '',
          price: train.price ? `Rp${parseInt(train.price).toLocaleString('id-ID')}` : '',
          seatsLeft: train.available_seats || 0,
          time: train.departure_time ? new Date(train.departure_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }) : '',
          arrivalTime: train.arrival_time ? new Date(train.arrival_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }) : '',
          departureStationName: train.departure_station?.name || '',
          arrivalStationName: train.arrival_station?.name || '',
          departure: train.departure_station?.name || '',
          arrival: train.arrival_station?.name || '',
          duration: train.duration_minutes ? `${Math.floor(train.duration_minutes / 60)}h ${train.duration_minutes % 60}m` : '',
          date: train.departure_time ? new Date(train.departure_time).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : ''
        }));
        setTrains(transformedTrains);
        setShowAllTrains(true);
      } else {
        setTrains([]);
        setError('Tidak ada kereta yang tersedia');
      }
    } catch (error) {
      console.error('Error fetching all trains:', error);
      setError('Terjadi kesalahan saat memuat jadwal kereta');
      setTrains([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchTrains = useCallback(async (departureId: number, arrivalId: number, date: Date) => {
    setIsLoading(true);
    setError(null);
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await trainService.searchTrains({
        departure_station_id: departureId,
        arrival_station_id: arrivalId,
        date: formattedDate,
      });

      if (response && response.trains && Array.isArray(response.trains)) {
        const transformedTrains = response.trains.map((train: any) => ({
          id: train.id,
          name: train.name || '',
          operator: train.operator || '',
          classType: train.class_type || '',
          price: train.price ? `Rp${parseInt(train.price).toLocaleString('id-ID')}` : '',
          seatsLeft: train.available_seats || 0,
          time: train.departure_time ? new Date(train.departure_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }) : '',
          arrivalTime: train.arrival_time ? new Date(train.arrival_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }) : '',
          departureStationName: train.departure_station?.name || '',
          arrivalStationName: train.arrival_station?.name || '',
          departure: train.departure_station?.name || '',
          arrival: train.arrival_station?.name || '',
          duration: train.duration_minutes ? `${Math.floor(train.duration_minutes / 60)}h ${train.duration_minutes % 60}m` : '',
          date: train.departure_time ? new Date(train.departure_time).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : ''
        }));
        setTrains(transformedTrains);
        setShowAllTrains(false);
      } else {
        setTrains([]);
        setError('Tidak ada kereta yang ditemukan untuk rute dan tanggal yang dipilih');
      }
    } catch (error) {
      console.error('Error searching trains:', error);
      setError('Terjadi kesalahan saat mencari jadwal kereta');
      setTrains([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (departureStationId && arrivalStationId && selectedDate) {
      searchTrains(departureStationId, arrivalStationId, new Date(selectedDate));
    }
  };

  useEffect(() => {
    const departure = searchParams.get('departure');
    const arrival = searchParams.get('arrival');
    const date = searchParams.get('date');

    fetchStations();

    if (departure && arrival && date) {
      setDepartureStationId(Number(departure));
      setArrivalStationId(Number(arrival));
      setSelectedDate(new Date(date).toISOString().split('T')[0]);
      setShowAllTrains(false);
      searchTrains(Number(departure), Number(arrival), new Date(date));
    } else {
      setSelectedDate(new Date().toISOString().split('T')[0]);
      fetchAllTrains();
    }
  }, [searchParams, fetchStations, fetchAllTrains, searchTrains]);

  useEffect(() => {
    const departure = searchParams.get('departure');
    const arrival = searchParams.get('arrival');
    
    if (!departure && !arrival && stations.length > 1 && !departureStationId && !arrivalStationId) {
      setDepartureStationId(stations[0].id);
      setArrivalStationId(stations[1].id);
    }
  }, [stations, searchParams, departureStationId, arrivalStationId]);

  const handleSelectTrain = (train: Train) => {
    const isLoggedIn = authService.isLoggedIn();
    
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    router.push(`/seats?train_id=${train.id}&date=${selectedDate}`);
  };

  // Filter trains - Flutter style
  const filteredTrains = trains.filter((train) => {
    const query = searchQuery.toLowerCase();
    const matchesClass = trainClassFilter === 'Semua' || train.classType === trainClassFilter;
    const matchesSearch = train.name.toLowerCase().includes(query) ||
                         train.departureStationName.toLowerCase().includes(query) ||
                         train.arrivalStationName.toLowerCase().includes(query) ||
                         train.operator.toLowerCase().includes(query);
    return matchesClass && matchesSearch;
  });  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Simple Header - Flutter style */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-center text-gray-800">
          Pilih Jadwal Keberangkatan
        </h1>
      </div>

      {/* Compact Search Filter - Flutter style */}
      <div className="mb-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">              <div>
                <select
                  value={departureStationId || ''}
                  onChange={(e) => setDepartureStationId(Number(e.target.value))}
                  className="w-full py-2.5 px-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  required
                >
                  <option value="">Stasiun Keberangkatan</option>
                  {stations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </div>
                <div>
                <select
                  value={arrivalStationId || ''}
                  onChange={(e) => setArrivalStationId(Number(e.target.value))}
                  className="w-full py-2.5 px-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  required
                >
                  <option value="">Stasiun Tujuan</option>
                  {stations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full py-2.5 px-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div>                <select
                  value={trainClassFilter}
                  onChange={(e) => setTrainClassFilter(e.target.value)}
                  className="w-full py-2.5 px-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                >
                  <option value="Semua">Semua Kelas</option>
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="Bisnis">Bisnis</option>
                  <option value="Eksekutif">Eksekutif</option>
                </select>
              </div>
              
              <div>                <button 
                  type="submit" 
                  disabled={isLoading || !departureStationId || !arrivalStationId || !selectedDate}
                  className="w-full py-2.5 text-sm rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                  style={{ backgroundColor: theme.primaryColor, color: 'white' }}
                >
                  {isLoading ? 'Mencari...' : 'Cari Kereta'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>      {/* Simple Search Field - Flutter style */}
      <div className="mb-4">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari Kereta..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          />
        </div>
      </div>      {/* Tampilkan Semua Kereta Button */}
      <div className="mb-4">
        <button
          onClick={() => {
            setSearchQuery('');
            setTrainClassFilter('Semua');
            setShowAllTrains(true);
            fetchAllTrains();
          }}
          className="w-full py-2.5 px-4 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Tampilkan Semua Kereta
        </button>
      </div>      {/* Simple Train List - Flutter style */}
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2" style={{ borderColor: theme.primaryColor }}></div>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-600">
            {error}
          </div>
        ) : filteredTrains.length === 0 ? (
          <div className="py-8 text-center text-gray-600">
            {trains.length === 0 
              ? 'Tidak ada jadwal kereta yang tersedia'
              : 'Tidak ada kereta yang sesuai dengan filter yang dipilih'
            }
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTrains.map((train) => (
              <div 
                key={train.id} 
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200" 
                onClick={() => handleSelectTrain(train)}
              >
                {/* Train name and class */}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-800">{train.name}</h3>
                    <p className="text-xs text-gray-600">{train.operator}</p>
                  </div>
                  <span 
                    className="px-2 py-1 text-xs font-semibold rounded-md"
                    style={{ 
                      backgroundColor: theme.primaryColor + '15', 
                      color: theme.primaryColor 
                    }}
                  >
                    {train.classType}
                  </span>
                </div>

                {/* Time and route */}
                <div className="flex items-center justify-between mb-2">
                  <div className="text-left">
                    <div className="text-base font-bold" style={{ color: theme.primaryColor }}>
                      {train.time}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {train.departureStationName}
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center px-2">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <div className="mx-2 text-xs text-gray-500">{train.duration}</div>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold" style={{ color: theme.primaryColor }}>
                      {train.arrivalTime}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {train.arrivalStationName}
                    </div>
                  </div>
                </div>

                {/* Price and seats */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="text-sm font-bold" style={{ color: theme.primaryColor }}>
                    {train.price}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <FiUsers className="mr-1 h-3 w-3" />
                    <span>{train.seatsLeft} kursi</span>
                    <FiChevronRight className="ml-2 h-3 w-3 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
