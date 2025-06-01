'use client';

import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiClock } from 'react-icons/fi';

interface PromoBanner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  discount: string;
  bgGradient: string;
  textColor: string;
  buttonColor: string;
  isLimited: boolean;
  endDate?: string;
}

const promoData: PromoBanner[] = [
  {
    id: 1,
    title: "Flash Sale Weekend",
    subtitle: "Diskon hingga 50%",
    description: "Untuk semua rute populer Jakarta-Bandung",
    discount: "50%",
    bgGradient: "from-red-500 via-pink-600 to-purple-700",
    textColor: "text-white",
    buttonColor: "bg-white text-red-600",
    isLimited: true,
    endDate: "2025-06-02T23:59:59"
  },
  {
    id: 2,
    title: "Paket Liburan",
    subtitle: "Cashback 25%",
    description: "Untuk pembelian tiket PP min. 4 penumpang",
    discount: "25%",
    bgGradient: "from-blue-500 via-cyan-600 to-teal-700",
    textColor: "text-white",
    buttonColor: "bg-white text-blue-600",
    isLimited: false
  },
  {
    id: 3,
    title: "Member Baru",
    subtitle: "Welcome Bonus",
    description: "Gratis biaya admin untuk booking pertama",
    discount: "FREE",
    bgGradient: "from-green-500 via-emerald-600 to-teal-700",
    textColor: "text-white",
    buttonColor: "bg-white text-green-600",
    isLimited: false
  }
];

const PromoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    // Auto-advance carousel
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promoData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update countdown timers
    const timer = setInterval(() => {
      const newTimeLeft: { [key: number]: string } = {};
      
      promoData.forEach((promo) => {
        if (promo.isLimited && promo.endDate) {
          const now = new Date().getTime();
          const end = new Date(promo.endDate).getTime();
          const distance = end - now;

          if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            newTimeLeft[promo.id] = `${days}h ${hours}j ${minutes}m`;
          } else {
            newTimeLeft[promo.id] = "Expired";
          }
        }
      });
      
      setTimeLeft(newTimeLeft);
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % promoData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + promoData.length) % promoData.length);
  };

  const currentPromo = promoData[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-8">
      <div 
        className={`bg-gradient-to-r ${currentPromo.bgGradient} relative min-h-[200px] flex items-center transition-all duration-500`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-20 h-20 border border-white rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-12 h-12 border border-white rounded-full"></div>
        </div>

        <div className="relative z-10 p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Content */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <h2 className={`text-2xl md:text-3xl font-bold ${currentPromo.textColor}`}>
                  {currentPromo.title}
                </h2>
                {currentPromo.isLimited && timeLeft[currentPromo.id] && (
                  <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                    <FiClock className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">
                      {timeLeft[currentPromo.id]}
                    </span>
                  </div>
                )}
              </div>
              
              <p className={`text-lg mb-2 ${currentPromo.textColor} opacity-90`}>
                {currentPromo.subtitle}
              </p>
              <p className={`text-sm ${currentPromo.textColor} opacity-80 mb-4`}>
                {currentPromo.description}
              </p>
              
              <button className={`${currentPromo.buttonColor} px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg`}>
                Klaim Sekarang
              </button>
            </div>

            {/* Discount Badge */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${currentPromo.textColor}`}>
                      {currentPromo.discount}
                    </div>
                    <div className={`text-xs ${currentPromo.textColor} opacity-80`}>
                      {currentPromo.discount === 'FREE' ? 'GRATIS' : 'OFF'}
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
        >
          <FiChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
        >
          <FiChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {promoData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoCarousel;
