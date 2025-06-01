'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiRefreshCcw, FiSearch } from 'react-icons/fi';
import { FaTrain, FaUsers } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { authService, stationService } from '@/utils/api';
import theme from '@/utils/theme';
import { Station } from '@/types';
import AnimatedCard from '@/components/AnimatedCard';
import { useToast } from '@/components/Toast';
import SearchHistory from '@/components/SearchHistory';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import FeedbackModal from '@/components/FeedbackModal';
import EnhancedStatsSection from '@/components/EnhancedStatsSection';
import PromoCarousel from '@/components/PromoCarousel';
import TestimonialSection from '@/components/TestimonialSection';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import BookingConfirmationModal from '@/components/BookingConfirmationModal';
import RealTimeNotifications from '@/components/RealTimeNotifications';

export default function Home() {
  const router = useRouter();
  const { showToast } = useToast();
  const searchFormRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedDepartureStation, setSelectedDepartureStation] = useState<Station | null>(null);
  const [selectedArrivalStation, setSelectedArrivalStation] = useState<Station | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [passengerCount, setPassengerCount] = useState(1);
  const [isLoadingStations, setIsLoadingStations] = useState(true);
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickBooking, setShowQuickBooking] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState<any>(null);

  useEffect(() => {
    checkLoginStatus();
    fetchStations();
  }, []);

  const checkLoginStatus = () => {
    const loggedIn = authService.isLoggedIn();
    setIsLoggedIn(loggedIn);
  };

  const fetchStations = async () => {
    setIsLoadingStations(true);
    try {
      const response = await stationService.getAllStations();
      if (response && Array.isArray(response)) {
        setStations(response);
        if (response.length > 0) {
          setSelectedDepartureStation(response[0]);
          setSelectedArrivalStation(response.length > 1 ? response[1] : response[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching stations:', error);
    } finally {
      setIsLoadingStations(false);
    }
  };

  const handleSearchTrains = async () => {
    // Validation
    if (!selectedDepartureStation || !selectedArrivalStation) {
      showToast({
        type: 'warning',
        title: 'Stasiun Belum Dipilih',
        message: 'Silakan pilih stasiun asal dan tujuan terlebih dahulu'
      });
      return;
    }

    if (selectedDepartureStation.id === selectedArrivalStation.id) {
      showToast({
        type: 'error',
        title: 'Stasiun Sama',
        message: 'Stasiun asal dan tujuan tidak boleh sama'
      });
      return;
    }

    setIsSearching(true);

    // Save search to history
    const searchItem = {
      id: Math.random().toString(36).substr(2, 9),
      departure: selectedDepartureStation.name,
      arrival: selectedArrivalStation.name,
      date: selectedDate.toISOString(),
      passengers: passengerCount,
      timestamp: Date.now()
    };

    // Save to localStorage
    const existingHistory = localStorage.getItem('keretaxpress_search_history');
    let history = [];
    if (existingHistory) {
      try {
        history = JSON.parse(existingHistory);
      } catch (error) {
        console.error('Error parsing search history:', error);
      }
    }
    
    // Add new search to beginning and limit to 10 items
    history.unshift(searchItem);
    history = history.slice(0, 10);
    localStorage.setItem('keretaxpress_search_history', JSON.stringify(history));

    // Simulate search delay for better UX
    setTimeout(() => {
      setIsSearching(false);
      showToast({
        type: 'success',
        title: 'Pencarian Berhasil',
        message: 'Mengarahkan ke halaman jadwal kereta...'
      });
      
      router.push(`/schedule?departure=${selectedDepartureStation.id}&arrival=${selectedArrivalStation.id}&date=${selectedDate.toISOString()}&passengers=${passengerCount}`);
    }, 1500);
  };

  const swapStations = () => {
    const temp = selectedDepartureStation;
    setSelectedDepartureStation(selectedArrivalStation);
    setSelectedArrivalStation(temp);
    
    showToast({
      type: 'info',
      title: 'Stasiun Ditukar',
      message: 'Stasiun asal dan tujuan berhasil ditukar'
    });
  };

  const handleSelectSearchHistory = (item: any) => {
    // Find stations by name
    const departureStation = stations.find(s => s.name === item.departure);
    const arrivalStation = stations.find(s => s.name === item.arrival);
    
    if (departureStation) setSelectedDepartureStation(departureStation);
    if (arrivalStation) setSelectedArrivalStation(arrivalStation);
    setSelectedDate(new Date(item.date));
    setPassengerCount(item.passengers);
    setShowSearchHistory(false);
    
    showToast({
      type: 'success',
      title: 'Riwayat Dimuat',
      message: 'Data pencarian sebelumnya berhasil dimuat'
    });
  };

  const handleFeedbackSubmit = (feedback: { rating: number; message: string }) => {
    // Save feedback (in real app, send to API)
    console.log('Feedback submitted:', feedback);
    
    showToast({
      type: 'success',
      title: 'Terima Kasih!',
      message: 'Feedback Anda sangat berharga untuk kami'
    });
  };

  const handleQuickBookingSelect = (route: any) => {
    const bookingDetails = {
      departure: route.from,
      arrival: route.to,
      date: selectedDate.toLocaleDateString('id-ID'),
      time: route.nextDeparture,
      passengers: passengerCount,
      trainClass: 'Executive',
      price: route.price * passengerCount,
      duration: route.duration
    };
    
    setSelectedBookingDetails(bookingDetails);
    setShowQuickBooking(false);
    setShowBookingConfirmation(true);
  };

  const handleBookingConfirm = () => {
    setShowBookingConfirmation(false);
    setSelectedBookingDetails(null);
    showToast({
      type: 'success',
      title: 'Pemesanan Berhasil!',
      message: 'Tiket Anda telah berhasil dipesan. Cek email untuk detail.'
    });
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">{/* Removed top padding since navbar is now in layout */}
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-blue-100 border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Sistem Online 24/7</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg leading-tight">
            Perjalanan Dimulai dari
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              KeretaXpress
            </span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Platform terpercaya untuk pemesanan tiket kereta api di Indonesia.
            Nikmati perjalanan yang nyaman dan terjangkau ke berbagai destinasi.
          </p>
          
          {/* Enhanced Quick Stats */}
          <EnhancedStatsSection />
        </div>

        {/* Enhanced Search Form */}
        <AnimatedCard className="mb-12" delay={0.2}>
          <div ref={searchFormRef} className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <FaTrain className="text-blue-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Cari Jadwal Kereta</h2>
              </div>
              
              {/* Search History Button */}
              <button
                onClick={() => setShowSearchHistory(!showSearchHistory)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiSearch className="w-4 h-4" />
                Riwayat
              </button>
            </div>
          
          {isLoadingStations ? (
            <div className="space-y-6">
              <LoadingSkeleton className="h-16" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LoadingSkeleton className="h-16" />
                <LoadingSkeleton className="h-16" />
              </div>
              <LoadingSkeleton type="button" className="w-full" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Station Selection with Swap */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
                <div className="lg:col-span-2">
                  <label htmlFor="departure" className="block text-sm font-semibold text-gray-700 mb-2">Stasiun Asal</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaTrain className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <select
                      id="departure"
                      className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 text-gray-800 font-medium"
                      value={selectedDepartureStation?.id || ''}
                      onChange={(e) => {
                        const station = stations.find(s => s.id === parseInt(e.target.value));
                        setSelectedDepartureStation(station || null);
                      }}
                    >
                      <option value="">Pilih Stasiun Asal</option>
                      {stations.map((station) => (
                        <option key={station.id} value={station.id}>
                          {station.name} ({station.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Enhanced Swap Button */}
                <div className="flex justify-center lg:col-span-1">
                  <button
                    onClick={swapStations}
                    disabled={!selectedDepartureStation || !selectedArrivalStation}
                    className="p-3 bg-blue-50 hover:bg-blue-100 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
                    title="Tukar stasiun"
                  >
                    <FiRefreshCcw className="text-blue-600 text-lg group-hover:rotate-180 transition-transform duration-300 disabled:text-gray-400" />
                  </button>
                </div>
                
                <div className="lg:col-span-2">
                  <label htmlFor="arrival" className="block text-sm font-semibold text-gray-700 mb-2">Stasiun Tujuan</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaTrain className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <select
                      id="arrival"
                      className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 text-gray-800 font-medium"
                      value={selectedArrivalStation?.id || ''}
                      onChange={(e) => {
                        const station = stations.find(s => s.id === parseInt(e.target.value));
                        setSelectedArrivalStation(station || null);
                      }}
                    >
                      <option value="">Pilih Stasiun Tujuan</option>
                      {stations.map((station) => (
                        <option key={station.id} value={station.id}>
                          {station.name} ({station.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Date and Passenger Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Berangkat</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date: Date | null) => date && setSelectedDate(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 text-gray-800 font-medium"
                    />
                  </div>
                  {/* Quick Date Buttons */}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setSelectedDate(new Date())}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-600 hover:text-gray-800"
                    >
                      Hari Ini
                    </button>
                    <button
                      onClick={() => {
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        setSelectedDate(tomorrow);
                      }}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-600 hover:text-gray-800"
                    >
                      Besok
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="passengers" className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Penumpang</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUsers className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <select
                      id="passengers"
                      className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 text-gray-800 font-medium"
                      value={passengerCount}
                      onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Penumpang' : 'Penumpang'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleSearchTrains}
                disabled={isSearching || !selectedDepartureStation || !selectedArrivalStation}
                className="w-full py-4 px-6 text-white font-bold text-lg rounded-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-xl transform hover:scale-[1.02] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="flex items-center justify-center gap-3">
                  {isSearching ? (
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
              </button>
            </div>
          )}
          
          {/* Search History Component */}
          <SearchHistory
            isVisible={showSearchHistory}
            onSelectHistory={handleSelectSearchHistory}
            onClose={() => setShowSearchHistory(false)}
          />
          </div>
        </AnimatedCard>
        
        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Mengapa Memilih KeretaXpress?</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">Nikmati pengalaman perjalanan terbaik dengan layanan terdepan</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard delay={0.2}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <FaTrain className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Booking Mudah</h3>
                <p className="text-blue-100">Pesan tiket dalam hitungan menit dengan antarmuka yang user-friendly</p>
              </div>
            </AnimatedCard>
            
            <AnimatedCard delay={0.4}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Pembayaran Aman</h3>
                <p className="text-blue-100">Berbagai metode pembayaran yang aman dan terpercaya</p>
              </div>
            </AnimatedCard>
            
            <AnimatedCard delay={0.6}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Real-time Info</h3>
                <p className="text-blue-100">Informasi jadwal dan status kereta secara real-time</p>
              </div>
            </AnimatedCard>
          </div>
        </div>

        {/* Enhanced Promo Carousel */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Promo Spesial</h2>
            <p className="text-blue-100 text-lg">Jangan lewatkan penawaran menarik untuk perjalanan Anda</p>
          </div>
          <PromoCarousel />
        </div>
        
        {/* Customer Testimonials Section */}
        <div className="mb-16">
          <TestimonialSection />
        </div>
        
        {/* Enhanced Popular Routes Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Rute Populer</h2>
            <p className="text-blue-100 text-lg">Pilihan rute favorit pengguna KeretaXpress</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { from: 'Jakarta', to: 'Bandung', price: 'Rp 120.000', duration: '3j 30m', popular: true },
              { from: 'Jakarta', to: 'Yogyakarta', price: 'Rp 180.000', duration: '7j 45m', popular: false },
              { from: 'Surabaya', to: 'Malang', price: 'Rp 85.000', duration: '2j 15m', popular: false },
              { from: 'Bandung', to: 'Cirebon', price: 'Rp 95.000', duration: '2j 45m', popular: true }
            ].map((route, index) => (
              <AnimatedCard key={index} delay={0.2 + index * 0.1}>
                <div 
                  className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group overflow-hidden"
                  onClick={() => {
                    // Quick select route
                    const departure = stations.find(s => s.name.includes(route.from.split(' ')[0]));
                    const arrival = stations.find(s => s.name.includes(route.to.split(' ')[0]));
                    if (departure) setSelectedDepartureStation(departure);
                    if (arrival) setSelectedArrivalStation(arrival);
                    
                    // Scroll to search form
                    searchFormRef.current?.scrollIntoView({ behavior: 'smooth' });
                    
                    showToast({
                      type: 'success',
                      title: 'Rute Dipilih',
                      message: `Rute ${route.from} - ${route.to} berhasil dipilih`
                    });
                  }}
                >
                  {route.popular && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      POPULER
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce-soft"></div>
                      <span className="text-white font-semibold">{route.from}</span>
                    </div>
                    <div className="relative">
                      <FaTrain className="text-blue-300 group-hover:text-blue-200 transition-colors group-hover:animate-pulse" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{route.to}</span>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce-soft" style={{ animationDelay: '1s' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-blue-100 text-sm">Mulai dari</p>
                      <p className="text-white font-bold group-hover:text-yellow-300 transition-colors">{route.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-100 text-sm">Durasi</p>
                      <p className="text-white font-medium">{route.duration}</p>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* Enhanced Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <div className="relative group">
            {/* Quick Actions Menu */}
            <div className="absolute bottom-16 right-0 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 space-y-2">
              <button 
                onClick={() => setShowQuickBooking(true)}
                className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
              >
                <FaTrain className="w-4 h-4" />
                <span className="text-sm font-medium">Quick Book</span>
              </button>
              <button 
                onClick={() => searchFormRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
              >
                <FiSearch className="w-4 h-4" />
                <span className="text-sm font-medium">Cari Jadwal</span>
              </button>
              <button 
                onClick={() => setShowSearchHistory(true)}
                className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
              >
                <FiCalendar className="w-4 h-4" />
                <span className="text-sm font-medium">Riwayat</span>
              </button>
              <button 
                onClick={() => setShowFeedback(true)}
                className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8" />
                </svg>
                <span className="text-sm font-medium">Feedback</span>
              </button>
            </div>
            
            {/* Main FAB */}
            <button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500/50 group-hover:rotate-45"
              onClick={() => searchFormRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              <FaTrain className="text-xl group-hover:animate-pulse" />
            </button>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Quick Book Ticket
            </div>
          </div>
        </div>
        
        {/* Auth Buttons (Only show if not logged in) */}
        {!isLoggedIn && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 shadow-xl border-t border-gray-200/50 md:hidden z-40">
            <div className="flex gap-3">
              <Link 
                href="/login"
                className="flex-1 py-3 px-2 border-2 border-blue-500 text-blue-500 font-bold rounded-xl text-center transition-all duration-200 hover:bg-blue-50 hover:shadow-md"
                style={{ borderColor: theme.primaryColor, color: theme.primaryColor }}
              >
                MASUK
              </Link>
              <Link 
                href="/register"
                className="flex-1 py-3 px-2 text-white font-bold rounded-xl text-center transition-all duration-200 hover:opacity-90 hover:shadow-md transform hover:scale-[1.02]"
                style={{ backgroundColor: theme.primaryColor }}
              >
                DAFTAR
              </Link>
            </div>
          </div>
        )}
        
        {/* Feedback Modal */}
        <FeedbackModal
          isOpen={showFeedback}
          onClose={() => setShowFeedback(false)}
          onSubmit={handleFeedbackSubmit}
        />
        
        {/* PWA Install Prompt */}
        <PWAInstallPrompt />
      </div>
    </div>
  );
}
