'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowRight, FiUsers, FiChevronRight, FiFilter, FiRefreshCw, FiMapPin, FiClock, FiStar, FiCalendar } from 'react-icons/fi';
import { FaTrain } from 'react-icons/fa';
import { MdSwapVert, MdOutlineCompareArrows } from 'react-icons/md';
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
  
  // Enhanced features
  const [sortBy, setSortBy] = useState<'time' | 'price' | 'duration' | 'seats'>('time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [favoriteTrains, setFavoriteTrains] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<any[]>([]);
  const [popularRoutes, setPopularRoutes] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

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
      // Save search to recent searches
      saveSearch(departureStationId, arrivalStationId, selectedDate);
      searchTrains(departureStationId, arrivalStationId, new Date(selectedDate));
    }
  };  useEffect(() => {
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
  // Enhanced filtering and sorting functionality
  const filteredAndSortedTrains = trains
    .filter((train) => {
      const query = searchQuery.toLowerCase();
      const matchesClass = trainClassFilter === 'Semua' || train.classType === trainClassFilter;
      const matchesSearch = train.name.toLowerCase().includes(query) ||
                           train.departureStationName.toLowerCase().includes(query) ||
                           train.arrivalStationName.toLowerCase().includes(query) ||
                           train.operator.toLowerCase().includes(query);
      
      // Price range filter
      const price = parseInt(train.price.replace(/\D/g, ''));
      const matchesPrice = price >= priceRange.min && price <= priceRange.max;
      
      return matchesClass && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'price':
          const priceA = parseInt(a.price.replace(/\D/g, ''));
          const priceB = parseInt(b.price.replace(/\D/g, ''));
          comparison = priceA - priceB;
          break;
        case 'duration':
          const durationA = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split('h')[1]?.replace('m', '') || '0');
          const durationB = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split('h')[1]?.replace('m', '') || '0');
          comparison = durationA - durationB;
          break;
        case 'seats':
          comparison = a.seatsLeft - b.seatsLeft;
          break;
        case 'time':
        default:
          comparison = a.time.localeCompare(b.time);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Handle station swapping
  const handleSwapStations = () => {
    const tempDeparture = departureStationId;
    setDepartureStationId(arrivalStationId);
    setArrivalStationId(tempDeparture);
  };

  // Handle favorite toggle
  const toggleFavorite = (trainId: string) => {
    setFavoriteTrains(prev => 
      prev.includes(trainId) 
        ? prev.filter(id => id !== trainId)
        : [...prev, trainId]
    );
  };

  // Save search to recent searches
  const saveSearch = (departure: number, arrival: number, date: string) => {
    const departureStation = stations.find(s => s.id === departure);
    const arrivalStation = stations.find(s => s.id === arrival);
    
    if (departureStation && arrivalStation) {
      const newSearch = {
        id: Date.now(),
        departure: departureStation.name,
        arrival: arrivalStation.name,
        date,
        timestamp: new Date().toISOString()
      };
      
      setRecentSearches(prev => [newSearch, ...prev.slice(0, 4)]);
    }
  };return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">      {/* Enhanced Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-white mb-2 drop-shadow-lg">
          Pilih Jadwal Keberangkatan
        </h1>
        <p className="text-center text-blue-100">
          Temukan jadwal kereta yang sesuai dengan perjalanan Anda
        </p>
      </div>      {/* Enhanced Search Filter */}
      <div className="mb-12">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">          <form onSubmit={handleSearch} className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <FaTrain className="text-blue-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Cari Jadwal Kereta</h2>
              </div>
            </div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stasiun Keberangkatan
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaTrain className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <select
                    value={departureStationId || ''}
                    onChange={(e) => setDepartureStationId(Number(e.target.value))}
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 text-gray-800 font-medium"
                    required
                  >
                    <option value="">Pilih stasiun keberangkatan</option>
                    {stations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button in the middle */}
              <div className="flex justify-center lg:col-span-1">
                <button
                  type="button"
                  onClick={handleSwapStations}
                  disabled={!departureStationId || !arrivalStationId}
                  className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/90 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-secondary group mt-4"
                  title="Tukar stasiun"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-disabled:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m-4 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stasiun Tujuan
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaTrain className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <select
                    value={arrivalStationId || ''}
                    onChange={(e) => setArrivalStationId(Number(e.target.value))}
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 text-gray-800 font-medium"
                    required
                  >
                    <option value="">Pilih stasiun tujuan</option>
                    {stations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>            {/* Date, Class, and Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tanggal Keberangkatan
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 text-gray-800 font-medium"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kelas Kereta
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaTrain className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <select
                    value={trainClassFilter}
                    onChange={(e) => setTrainClassFilter(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 text-gray-800 font-medium"
                  >
                    <option value="Semua">Semua Kelas</option>
                    <option value="Ekonomi">Ekonomi</option>
                    <option value="Bisnis">Bisnis</option>
                    <option value="Eksekutif">Eksekutif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  &nbsp;
                </label>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full py-4 px-6 border-2 border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-all duration-200 bg-white hover:border-gray-300 flex items-center justify-center gap-2 font-medium text-gray-800"
                >
                  <FiFilter className="h-5 w-5" />
                  Filter Lanjutan
                </button>
              </div>
            </div>

            {/* Search Button - Separate Row */}
            <button 
              type="submit" 
              disabled={isLoading || !departureStationId || !arrivalStationId || !selectedDate}
              className="w-full py-4 px-6 text-white font-bold text-lg rounded-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-xl transform hover:scale-[1.02] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>MENCARI KERETA...</span>
                  </>
                ) : (
                  <>
                    <FaTrain className="text-xl" />
                    <span>CARI KERETA SEKARANG</span>
                  </>
                )}
              </div>
            </button>{/* Advanced Filters Panel */}
            {showFilters && (
              <div className="mt-6 p-6 border-2 border-gray-200 rounded-xl bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Lanjutan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Rentang Harga: Rp{priceRange.min.toLocaleString('id-ID')} - Rp{priceRange.max.toLocaleString('id-ID')}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="1000000"
                        step="50000"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                        className="flex-1"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000000"
                        step="50000"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Tampilan</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-2 text-xs rounded-md border transition-colors ${
                          viewMode === 'list'
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        List
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode('grid')}
                        className={`px-3 py-2 text-xs rounded-md border transition-colors ${
                          viewMode === 'grid'
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        Grid
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>      {/* Quick Suggestions - Recent Searches Only */}
      {recentSearches.length > 0 && (
        <div className="mb-12">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
            <div>              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiClock className="h-5 w-5" />
                Pencarian Terakhir
              </h3>
              <div className="space-y-3">
                {recentSearches.slice(0, 3).map((search) => (
                  <button
                    key={search.id}                    onClick={() => {
                      const depStation = stations.find(s => s.name === search.departure);
                      const arrStation = stations.find(s => s.name === search.arrival);
                      if (depStation && arrStation) {
                        setDepartureStationId(depStation.id);
                        setArrivalStationId(arrStation.id);
                        setSelectedDate(search.date);
                      }
                    }}
                    className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:border-gray-300 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-base font-semibold text-gray-800">
                          {search.departure} → {search.arrival}
                        </div>
                        <div className="text-sm text-gray-500">{search.date}</div>
                      </div>
                      <FiChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}      {/* Search and Controls */}
      <div className="mb-12 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari kereta, stasiun, atau operator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 text-gray-800 font-medium"
          />
        </div>{/* Sort Controls and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">            <div className="flex items-center gap-4">
              <label className="text-lg font-semibold text-white">Urutkan:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'time' | 'price' | 'duration' | 'seats')}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 text-gray-800 font-medium"
              >
                <option value="time">Waktu</option>
                <option value="price">Harga</option>
                <option value="duration">Durasi</option>
                <option value="seats">Kursi Tersisa</option>
              </select>              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-3 border-2 border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-all duration-200 bg-white hover:border-gray-300"
                title={`Urutan ${sortOrder === 'asc' ? 'Naik' : 'Turun'}`}
              >
                <MdOutlineCompareArrows className={`h-6 w-6 text-gray-600 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">            {/* View Mode Toggle */}
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setViewMode('list')}
                className={`px-6 py-3 transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-6 py-3 transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>            {/* Show All Trains Button - Enhanced */}
            <button
              onClick={() => {
                setSearchQuery('');
                setTrainClassFilter('Semua');
                setShowAllTrains(true);
                setPriceRange({ min: 0, max: 1000000 });
                fetchAllTrains();
              }}
              className="px-6 py-3 font-semibold rounded-xl border-2 hover:bg-blue-50 transition-all duration-200 hover:shadow-md flex items-center gap-2 shadow-sm bg-white"
              style={{ 
                color: theme.primaryColor, 
                borderColor: theme.primaryColor,
                minWidth: 'fit-content'
              }}
            >
              <FiRefreshCw className="h-5 w-5" />
              Tampilkan Semua
            </button>
          </div>
        </div>
      </div>      {/* Results Summary */}
      {!isLoading && !error && filteredAndSortedTrains.length > 0 && (
        <div className="mb-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-800">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">
              Ditemukan {filteredAndSortedTrains.length} kereta
              {trains.length !== filteredAndSortedTrains.length && ` dari ${trains.length} total`}
            </span>
          </div>
          <div className="text-sm text-blue-600">
            Diurutkan berdasarkan {
              sortBy === 'time' ? 'waktu' :
              sortBy === 'price' ? 'harga' :
              sortBy === 'duration' ? 'durasi' :
              'kursi tersisa'
            } ({sortOrder === 'asc' ? 'naik' : 'turun'})
          </div>
        </div>
      )}

      {/* Enhanced Train List */}
      <div>
        {isLoading ? (
          <div className="space-y-4">
            {/* Loading Skeletons */}
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <div className="h-6 bg-gray-200 rounded w-16 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="flex-1 flex items-center justify-center px-4">
                    <div className="h-px bg-gray-200 w-full"></div>
                  </div>
                  <div className="text-right">
                    <div className="h-6 bg-gray-200 rounded w-16 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <div className="mx-auto w-24 h-24 mb-4 text-red-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Terjadi Kesalahan</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchAllTrains()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : filteredAndSortedTrains.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto w-24 h-24 mb-4 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.7-2.6M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Kereta Ditemukan</h3>
            <p className="text-gray-600 mb-4">
              {trains.length === 0 
                ? 'Tidak ada jadwal kereta yang tersedia saat ini'
                : 'Tidak ada kereta yang sesuai dengan filter yang dipilih'
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setTrainClassFilter('Semua');
                setPriceRange({ min: 0, max: 1000000 });
                fetchAllTrains();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}`}>
            {filteredAndSortedTrains.map((train: Train) => (
              <div 
                key={train.id} 
                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200 ${
                  viewMode === 'grid' ? 'p-4' : 'p-6'
                }`}
                onClick={() => handleSelectTrain(train)}
              >
                {/* Train header with favorite button */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-gray-800 truncate ${viewMode === 'grid' ? 'text-sm' : 'text-base'}`}>
                      {train.name}
                    </h3>
                    <p className={`text-gray-600 truncate ${viewMode === 'grid' ? 'text-xs' : 'text-sm'}`}>
                      {train.operator}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <span 
                      className={`px-2 py-1 font-semibold rounded-md whitespace-nowrap ${viewMode === 'grid' ? 'text-xs' : 'text-sm'}`}
                      style={{ 
                        backgroundColor: theme.primaryColor + '15', 
                        color: theme.primaryColor 
                      }}
                    >
                      {train.classType}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(train.id);
                      }}
                      className={`p-1 rounded-full transition-colors ${
                        favoriteTrains.includes(train.id)
                          ? 'text-yellow-500 hover:text-yellow-600'
                          : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <FiStar className={`h-4 w-4 ${favoriteTrains.includes(train.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Time and route */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-left min-w-0">
                    <div className={`font-bold ${viewMode === 'grid' ? 'text-sm' : 'text-lg'}`} style={{ color: theme.primaryColor }}>
                      {train.time}
                    </div>
                    <div className={`text-gray-600 truncate ${viewMode === 'grid' ? 'text-xs' : 'text-sm'}`} title={train.departureStationName}>
                      <FiMapPin className="inline h-3 w-3 mr-1" />
                      {train.departureStationName}
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center px-2 min-w-0">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <div className={`mx-2 text-gray-500 flex items-center whitespace-nowrap ${viewMode === 'grid' ? 'text-xs' : 'text-sm'}`}>
                      <FiClock className="h-3 w-3 mr-1" />
                      {train.duration}
                    </div>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>

                  <div className="text-right min-w-0">
                    <div className={`font-bold ${viewMode === 'grid' ? 'text-sm' : 'text-lg'}`} style={{ color: theme.primaryColor }}>
                      {train.arrivalTime}
                    </div>
                    <div className={`text-gray-600 truncate ${viewMode === 'grid' ? 'text-xs' : 'text-sm'}`} title={train.arrivalStationName}>
                      <FiMapPin className="inline h-3 w-3 mr-1" />
                      {train.arrivalStationName}
                    </div>
                  </div>
                </div>

                {/* Price and seats */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className={`font-bold ${viewMode === 'grid' ? 'text-sm' : 'text-base'}`} style={{ color: theme.primaryColor }}>
                    {train.price}
                  </div>
                  <div className={`flex items-center text-gray-500 ${viewMode === 'grid' ? 'text-xs' : 'text-sm'}`}>
                    <FiUsers className="mr-1 h-3 w-3" />
                    <span>{train.seatsLeft} kursi</span>
                    <FiChevronRight className="ml-2 h-3 w-3 text-gray-400" />
                  </div>
                </div>

                {/* Additional info for grid view */}
                {viewMode === 'grid' && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      {train.date}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
