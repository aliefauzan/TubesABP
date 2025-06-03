import { useRef } from 'react';
import { FaTrain } from 'react-icons/fa';
import { Station } from '@/types';
import AnimatedCard from '@/components/AnimatedCard';

interface PopularRoutesProps {
  stations: Station[];
  onRouteSelect: (departure: Station | null, arrival: Station | null, routeName: string) => void;
  searchFormRef: React.RefObject<HTMLDivElement>;
}

export default function PopularRoutes({ stations, onRouteSelect, searchFormRef }: PopularRoutesProps) {
  const routes = [
    { from: 'Jakarta', to: 'Bandung', price: 'Rp 120.000', duration: '3j 30m', popular: true },
    { from: 'Jakarta', to: 'Yogyakarta', price: 'Rp 180.000', duration: '7j 45m', popular: false },
    { from: 'Surabaya', to: 'Malang', price: 'Rp 85.000', duration: '2j 15m', popular: false },
    { from: 'Bandung', to: 'Cirebon', price: 'Rp 95.000', duration: '2j 45m', popular: true }
  ];

  const handleRouteClick = (route: typeof routes[0]) => {
    const departure = stations.find(s => s.name.includes(route.from.split(' ')[0]));
    const arrival = stations.find(s => s.name.includes(route.to.split(' ')[0]));
    
    onRouteSelect(departure || null, arrival || null, `${route.from} - ${route.to}`);
    
    // Scroll to search form
    searchFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-4">Rute Populer</h2>
        <p className="text-blue-100 text-lg">Pilihan rute favorit pengguna KeretaXpress</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {routes.map((route, index) => (
          <AnimatedCard key={index} delay={0.2 + index * 0.1}>
            <div 
              className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => handleRouteClick(route)}
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
  );
}
