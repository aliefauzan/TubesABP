'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import TrainCard from '@/components/TrainCard';
import { trainService, stationService } from '@/lib/api';
import { Station, Train } from '@/types';

export default function SearchPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [trains, setTrains] = useState<Train[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [formData, setFormData] = useState({
    departureStation: '',
    arrivalStation: '',
    date: '',
  });

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await stationService.getAllStations();
        setStations(data);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTrains([]);
    
    try {
      const data = await trainService.searchTrains(
        parseInt(formData.departureStation),
        parseInt(formData.arrivalStation),
        formData.date
      );
      setTrains(data);
      setSearchPerformed(true);
    } catch (error) {
      console.error('Error searching trains:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTrain = (train: Train) => {
    // Store selected train and date in sessionStorage
    sessionStorage.setItem('selectedTrain', JSON.stringify(train));
    sessionStorage.setItem('travelDate', formData.date);
    
    // Navigate to seat selection page
    router.push('/seat-selection');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-primary rounded-xl p-6 text-white mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center">Temukan Perjalanan Anda</h1>
          <p className="text-center mb-6">Cari tiket kereta untuk perjalanan ke berbagai destinasi di Indonesia</p>
          
          <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                      value={formData.departureStation}
                      onChange={handleChange}
                      className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-700"
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
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-md mt-4">
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
                      value={formData.arrivalStation}
                      onChange={handleChange}
                      className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-700"
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
                      value={formData.date}
                      onChange={handleChange}
                      className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-700"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>
                
                <div className="md:col-span-6 flex items-end">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={isLoading}
                    className="w-full py-3 text-lg"
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
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {searchPerformed && (
          <div className="mt-8">
            <div className="flex items-center mb-6">
              <div className="w-1.5 h-6 bg-primary rounded-r mr-3"></div>
              <h2 className="text-2xl font-bold">Hasil Pencarian</h2>
            </div>
            
            {trains.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-lg shadow-md text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-lg font-bold mb-2">Kereta Tidak Ditemukan</h3>
                <p>Tidak ada kereta yang tersedia untuk kriteria pencarian Anda. Silakan coba stasiun atau tanggal yang berbeda.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {trains.map((train) => (
                  <TrainCard 
                    key={train.id} 
                    train={train} 
                    onSelect={handleSelectTrain} 
                  />
                ))}
              </div>
            )}
          </div>
        )}
        
        {!searchPerformed && (
          <div className="mt-12 mb-16">
            <div className="flex items-center mb-8">
              <div className="w-1.5 h-6 bg-primary rounded-r mr-3"></div>
              <h2 className="text-2xl font-bold">Kenapa Memilih KeretaXpress?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Proses Cepat</h3>
                <p className="text-gray-600 text-center">Pesan tiket kereta api dengan cepat dan mudah tanpa antre di loket stasiun.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Aman & Terpercaya</h3>
                <p className="text-gray-600 text-center">Transaksi aman dengan berbagai pilihan pembayaran yang terpercaya.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Promo Menarik</h3>
                <p className="text-gray-600 text-center">Nikmati berbagai promo dan diskon spesial untuk perjalanan Anda.</p>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
