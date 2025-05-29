'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowRight, FiCalendar, FiClock, FiUsers, FiChevronRight } from 'react-icons/fi';
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
  const [showAllTrains, setShowAllTrains] = useState(true); // Default to showing all trains
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
        // Transform the train data to match our frontend format
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
      const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      const response = await trainService.searchTrains({
        departure_station_id: departureId,
        arrival_station_id: arrivalId,
        date: formattedDate,
      });

      if (response && response.trains && Array.isArray(response.trains)) {
        // Transform the train data to match our frontend format
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

  useEffect(() => {
    const departure = searchParams.get('departure');
    const arrival = searchParams.get('arrival');
    const date = searchParams.get('date');

    // Always fetch stations first
    fetchStations();

    if (departure && arrival && date) {
      // If search parameters are provided, do a specific search
      setDepartureStationId(Number(departure));
      setArrivalStationId(Number(arrival));
      setSelectedDate(new Date(date).toISOString().split('T')[0]);
      setShowAllTrains(false);
      searchTrains(Number(departure), Number(arrival), new Date(date));
    } else {
      // Otherwise, show all trains by default (like Flutter app)
      setSelectedDate(new Date().toISOString().split('T')[0]);
      fetchAllTrains();
    }
  }, [searchParams, fetchStations, fetchAllTrains, searchTrains]);

  // Set default stations when stations are loaded and no search params
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

  // Find station names for display
  const getDepartureStationName = () => {
    const station = stations.find(s => s.id === departureStationId);
    return station ? `${station.name}` : 'Loading...';
  };

  const getArrivalStationName = () => {
    const station = stations.find(s => s.id === arrivalStationId);
    return station ? `${station.name}` : 'Loading...';
  };

  // Filter trains based on search query and class filter (like Flutter implementation)
  const filteredTrains = trains.filter((train) => {
    const query = searchQuery.toLowerCase();
    const matchesClass = trainClassFilter === 'Semua' || train.classType === trainClassFilter;
    const matchesSearch = train.name.toLowerCase().includes(query) ||
                         train.departureStationName.toLowerCase().includes(query) ||
                         train.arrivalStationName.toLowerCase().includes(query) ||
                         train.operator.toLowerCase().includes(query);
    return matchesClass && matchesSearch;
  });

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
    <div className="max-w-6xl mx-auto px-3 py-4 sm:px-4 lg:px-6">
      <div className="text-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Pilih Jadwal Keberangkatan</h1>
      </div>

      {/* Search Summary */}
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex-1 w-full">
            <div className="flex items-center justify-center sm:justify-start">
              <div className="font-bold text-gray-800 text-sm sm:text-base">{getDepartureStationName()}</div>
              <FiArrowRight className="mx-2 text-gray-400" />
              <div className="font-bold text-gray-800 text-sm sm:text-base">{getArrivalStationName()}</div>
            </div>
            <div className="flex items-center justify-center sm:justify-start mt-2 text-gray-600 text-xs sm:text-sm">
              <FiCalendar className="mr-1" />
              {selectedDate && formatDate(selectedDate)}
              {showAllTrains && (
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                  Menampilkan semua kereta
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => router.push('/')}
            className="w-full sm:w-auto px-4 py-2 text-sm border rounded-md transition-colors hover:bg-gray-50"
            style={{ borderColor: theme.primaryColor, color: theme.primaryColor }}
          >
            Ubah Pencarian
          </button>
        </div>
      </div>

      {/* Comprehensive Search Card (from /search page) */}
      <div className="rounded-lg p-4 sm:p-6 text-white mb-4" style={{ backgroundColor: theme.primaryColor }}>
        <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-center">Cari Jadwal Kereta</h2>
        <p className="text-center mb-4 sm:mb-6 text-sm sm:text-base">Temukan jadwal kereta untuk perjalanan Anda</p>
        
        <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg">
          <form onSubmit={(e) => {
            e.preventDefault();
            if (departureStationId && arrivalStationId && selectedDate) {
              searchTrains(departureStationId, arrivalStationId, new Date(selectedDate));
            }
          }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5">
                <label htmlFor="departureStation" className="block text-gray-700 font-medium mb-2">
                  Dari
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <select
                    id="departureStation"
                    name="departureStation"
                    value={departureStationId || ''}
                    onChange={(e) => setDepartureStationId(Number(e.target.value))}
                    className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                    required
                  >
                    <option value="">Pilih stasiun keberangkatan</option>
                    {stations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name}, {station.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="md:col-span-2 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-md mt-4" style={{ backgroundColor: theme.secondaryColor || '#6B7280' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m-4 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
              </div>
              
              <div className="md:col-span-5">
                <label htmlFor="arrivalStation" className="block text-gray-700 font-medium mb-2">
                  Ke
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <select
                    id="arrivalStation"
                    name="arrivalStation"
                    value={arrivalStationId || ''}
                    onChange={(e) => setArrivalStationId(Number(e.target.value))}
                    className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                    required
                  >
                    <option value="">Pilih stasiun tujuan</option>
                    {stations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name}, {station.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-6">
                <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                  Tanggal Keberangkatan
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              
              <div className="md:col-span-6 flex items-end">
                <button 
                  type="submit" 
                  disabled={isLoading || !departureStationId || !arrivalStationId || !selectedDate}
                  className="w-full py-3 text-lg rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                  style={{ backgroundColor: theme.primaryColor, color: 'white' }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Mencari Kereta...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      <span>Cari Kereta</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </form>
          
          {/* Additional Filter Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Search input */}
              <div className="lg:col-span-8">
                <label className="block text-gray-700 font-medium mb-2">Filter Pencarian</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Cari kereta, stasiun, atau operator..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <div className="mt-1 text-xs text-blue-600 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    Mencari: &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
              
              {/* Class filter */}
              <div className="lg:col-span-4">
                <label className="block text-gray-700 font-medium mb-2">Kelas Kereta</label>
                <div className="relative">
                  <select
                    value={trainClassFilter}
                    onChange={(e) => setTrainClassFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-700 font-medium"
                  >
                    <option value="Semua" className="text-gray-700">Semua Kelas</option>
                    <option value="Ekonomi" className="text-gray-700">Ekonomi</option>
                    <option value="Bisnis" className="text-gray-700">Bisnis</option>
                    <option value="Eksekutif" className="text-gray-700">Eksekutif</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                {trainClassFilter !== 'Semua' && (
                  <div className="mt-1 text-xs text-blue-600 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    Filter aktif: {trainClassFilter}
                  </div>
                )}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setTrainClassFilter('Semua');
                  setShowAllTrains(true);
                  // Reset to default stations if available
                  if (stations.length > 1) {
                    setDepartureStationId(stations[0].id);
                    setArrivalStationId(stations[1].id);
                  }
                  fetchAllTrains();
                }}
                className="flex-1 sm:flex-none px-6 py-3 text-sm border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium flex items-center justify-center gap-2 text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Reset Filter
              </button>
              <button
                onClick={() => {
                  setShowAllTrains(true);
                  fetchAllTrains();
                }}
                className="flex-1 sm:flex-none px-6 py-3 text-sm text-white rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2 shadow-md"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Tampilkan Semua Kereta
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Train List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-800">Jadwal Kereta</h2>
            <div className="text-xs sm:text-sm text-gray-600">
              {isLoading ? 'Memuat...' : (
                <>
                  {filteredTrains.length === trains.length 
                    ? `${trains.length} kereta tersedia`
                    : `${filteredTrains.length} dari ${trains.length} kereta`
                  }
                  {(searchQuery || trainClassFilter !== 'Semua') && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                      Terfilter
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-6">
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
                ? (showAllTrains 
                    ? 'Tidak ada jadwal kereta yang tersedia saat ini'
                    : 'Tidak ada jadwal kereta yang tersedia untuk rute dan tanggal yang dipilih'
                  )
                : 'Tidak ada kereta yang sesuai dengan filter yang dipilih'
              }
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTrains.map((train) => (
                <div key={train.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200" onClick={() => handleSelectTrain(train)}>
                  {/* Header with train name and class type */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-800 mb-1">{train.name}</h3>
                      <p className="text-xs text-gray-600">{train.operator}</p>
                    </div>
                    <div className="ml-3">
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-md"
                            style={{ 
                              backgroundColor: theme.primaryColor + '15', 
                              color: theme.primaryColor 
                            }}>
                        {train.classType}
                      </span>
                    </div>
                  </div>

                  {/* Timeline section - optimized for better spacing */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Departure */}
                    <div className="flex-1 text-left">
                      <div className="text-lg font-bold" style={{ color: theme.primaryColor }}>
                        {train.time}
                      </div>
                      <div className="text-xs font-medium text-gray-700 mt-0.5 truncate">
                        {train.departureStationName}
                      </div>
                    </div>

                    {/* Timeline visualization - compact */}
                    <div className="flex-1 flex flex-col items-center px-3">
                      <div className="relative w-full max-w-24">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 -translate-y-1/2"></div>
                        <div className="relative flex justify-center">
                          <div className="w-4 h-4 bg-white border-2 border-blue-400 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-blue-600 font-medium mt-1">
                        {train.duration}
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="flex-1 text-right">
                      <div className="text-lg font-bold" style={{ color: theme.primaryColor }}>
                        {train.arrivalTime}
                      </div>
                      <div className="text-xs font-medium text-gray-700 mt-0.5 truncate">
                        {train.arrivalStationName}
                      </div>
                    </div>
                  </div>

                  {/* Price and availability - compact layout */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-500">Total Biaya</span>
                      <div className="text-base font-bold" style={{ color: theme.primaryColor }}>
                        {train.price}
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <FiUsers className="mr-1 h-3 w-3" />
                      <span>{train.seatsLeft} kursi</span>
                      <FiChevronRight className="ml-2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 