'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar } from 'react-icons/fi';
import { FaTrain } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { authService, stationService } from '@/utils/api';
import theme from '@/utils/theme';
import { Station } from '@/types';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedDepartureStation, setSelectedDepartureStation] = useState<Station | null>(null);
  const [selectedArrivalStation, setSelectedArrivalStation] = useState<Station | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isLoadingStations, setIsLoadingStations] = useState(true);

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

  const handleSearchTrains = () => {
    if (selectedDepartureStation && selectedArrivalStation) {
      router.push(`/schedule?departure=${selectedDepartureStation.id}&arrival=${selectedArrivalStation.id}&date=${selectedDate.toISOString()}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col">
        {/* Hero Section */}
        <div 
          className="w-full rounded-2xl p-6 mb-10"
          style={{
            background: `linear-gradient(to right bottom, ${theme.primaryColor}, ${theme.secondaryColor})`,
            color: theme.textLightColor
          }}
        >
          <h1 className="text-2xl font-bold text-center mb-4">SELAMAT DATANG DI KERETAXPRESS</h1>
          <p className="text-center">Nikmati kemudahan memesan tiket kereta dengan harga terbaik</p>
        </div>
        
        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <h2 className="text-xl font-bold text-center mb-6">Cari Tiket Kereta</h2>
          
          {isLoadingStations ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2" style={{ borderColor: theme.primaryColor }}></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">Stasiun Asal</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaTrain className="text-gray-400" />
                  </div>
                  <select
                    id="departure"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedDepartureStation?.id || ''}
                    onChange={(e) => {
                      const station = stations.find(s => s.id === parseInt(e.target.value));
                      setSelectedDepartureStation(station || null);
                    }}
                  >
                    {stations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name} ({station.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="arrival" className="block text-sm font-medium text-gray-700 mb-1">Stasiun Tujuan</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaTrain className="text-gray-400" />
                  </div>
                  <select
                    id="arrival"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedArrivalStation?.id || ''}
                    onChange={(e) => {
                      const station = stations.find(s => s.id === parseInt(e.target.value));
                      setSelectedArrivalStation(station || null);
                    }}
                  >
                    {stations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name} ({station.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Berangkat</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => date && setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <button
                onClick={handleSearchTrains}
                className="w-full py-3 px-4 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: theme.primaryColor }}
              >
                CARI KERETA
              </button>
            </div>
          )}
        </div>
        
        {/* Promo Section */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4">Promo Spesial</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative h-48 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 z-20 text-white">
                <h3 className="font-bold">Diskon 20%</h3>
                <p className="text-sm text-white/70">Syarat & Ketentuan berlaku</p>
              </div>
              <div className="w-full h-full bg-gray-300" />
            </div>
            
            <div className="relative h-48 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 z-20 text-white">
                <h3 className="font-bold">Cashback 10%</h3>
                <p className="text-sm text-white/70">Syarat & Ketentuan berlaku</p>
              </div>
              <div className="w-full h-full bg-gray-300" />
            </div>
            
            <div className="relative h-48 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 z-20 text-white">
                <h3 className="font-bold">Tiket Murah</h3>
                <p className="text-sm text-white/70">Syarat & Ketentuan berlaku</p>
              </div>
              <div className="w-full h-full bg-gray-300" />
            </div>
          </div>
        </div>
        
        {/* Auth Buttons (Only show if not logged in) */}
        {!isLoggedIn && (
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg md:hidden">
            <div className="flex gap-3">
              <Link 
                href="/login"
                className="flex-1 py-3 px-2 border border-blue-500 text-blue-500 font-bold rounded-md text-center"
                style={{ borderColor: theme.primaryColor, color: theme.primaryColor }}
              >
                MASUK
              </Link>
              <Link 
                href="/register"
                className="flex-1 py-3 px-2 text-white font-bold rounded-md text-center"
                style={{ backgroundColor: theme.primaryColor }}
              >
                DAFTAR
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
