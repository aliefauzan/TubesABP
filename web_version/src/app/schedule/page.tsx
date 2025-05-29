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
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pilih Jadwal Keberangkatan</h1>
      </div>

      {/* Search Summary */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex-1">
            <div className="flex items-center justify-center md:justify-start">
              <div className="font-bold text-gray-800">{getDepartureStationName()}</div>
              <FiArrowRight className="mx-2 text-gray-400" />
              <div className="font-bold text-gray-800">{getArrivalStationName()}</div>
            </div>
            <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600 text-sm">
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
            className="mt-3 md:mt-0 px-4 py-2 text-sm border rounded-md transition-colors hover:bg-gray-50"
            style={{ borderColor: theme.primaryColor, color: theme.primaryColor }}
          >
            Ubah Pencarian
          </button>
        </div>
      </div>

      {/* Search and Filter Bar (like Flutter implementation) */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search input */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Cari kereta, stasiun, atau operator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Class filter */}
          <div>
            <select
              value={trainClassFilter}
              onChange={(e) => setTrainClassFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Semua">Semua Kelas</option>
              <option value="Ekonomi">Ekonomi</option>
              <option value="Bisnis">Bisnis</option>
              <option value="Eksekutif">Eksekutif</option>
            </select>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => {
              setSearchQuery('');
              setTrainClassFilter('Semua');
              fetchAllTrains();
            }}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset Filter
          </button>
          {!showAllTrains && departureStationId && arrivalStationId && (
            <button
              onClick={() => searchTrains(departureStationId, arrivalStationId, new Date(selectedDate))}
              className="px-4 py-2 text-sm text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: theme.primaryColor }}
            >
              Cari Ulang
            </button>
          )}
        </div>
      </div>

      {/* Train List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Jadwal Kereta</h2>
            <div className="text-sm text-gray-600">
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

        <div className="p-6">
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
            <div className="space-y-4">
              {filteredTrains.map((train) => (
                <div key={train.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100" onClick={() => handleSelectTrain(train)}>
                  {/* Header with train name and class type */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{train.name}</h3>
                      <p className="text-sm text-gray-600">{train.operator}</p>
                    </div>
                    <div className="ml-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-lg"
                            style={{ 
                              backgroundColor: theme.primaryColor + '20', 
                              color: theme.primaryColor 
                            }}>
                        {train.classType}
                      </span>
                    </div>
                  </div>

                  {/* Timeline section - similar to Flutter layout */}
                  <div className="flex items-center justify-between mb-6">
                    {/* Departure */}
                    <div className="flex-1 text-left">
                      <div className="text-xl font-bold" style={{ color: theme.primaryColor }}>
                        {train.time}
                      </div>
                      <div className="text-sm font-medium text-gray-700 mt-1">
                        {train.departureStationName}
                      </div>
                    </div>

                    {/* Timeline visualization */}
                    <div className="flex-1 flex flex-col items-center px-4">
                      <div className="relative w-full max-w-32">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 -translate-y-1/2"></div>
                        <div className="relative flex justify-center">
                          <div className="w-6 h-6 bg-white border-2 border-blue-400 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-blue-600 font-medium mt-2">
                        {train.duration}
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="flex-1 text-right">
                      <div className="text-xl font-bold" style={{ color: theme.primaryColor }}>
                        {train.arrivalTime}
                      </div>
                      <div className="text-sm font-medium text-gray-700 mt-1">
                        {train.arrivalStationName}
                      </div>
                    </div>
                  </div>

                  {/* Price and availability - similar to Flutter layout */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-500">Total Biaya</span>
                      <div className="text-lg font-bold" style={{ color: theme.primaryColor }}>
                        {train.price}
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <FiUsers className="mr-1" />
                      <span>{train.seatsLeft} kursi tersedia</span>
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