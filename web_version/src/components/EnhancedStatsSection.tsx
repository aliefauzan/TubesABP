'use client';

import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiClock, FiUsers, FiMapPin } from 'react-icons/fi';
import { FaTrain } from 'react-icons/fa';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend?: string;
  color: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, trend, color, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState('0');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      animateValue();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animateValue = () => {
    const numericValue = parseInt(value.replace(/\D/g, ''));
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      
      // Format the value back with original formatting
      if (value.includes('K+')) {
        setAnimatedValue(`${Math.floor(current / 1000)}K+`);
      } else if (value.includes('%')) {
        setAnimatedValue(`${Math.floor(current)}%`);
      } else if (value.includes('+')) {
        setAnimatedValue(`${Math.floor(current)}+`);
      } else {
        setAnimatedValue(Math.floor(current).toString());
      }
    }, duration / steps);
  };

  return (
    <div 
      className={`transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 ${color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-green-400">
              <FiTrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">{trend}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors">
            {animatedValue}
          </h3>
          <p className="text-blue-100 text-sm font-medium">{title}</p>
        </div>
      </div>
    </div>
  );
};

const EnhancedStatsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatsCard
        icon={<FiUsers className="text-white text-xl" />}
        title="Penumpang"
        value="500K+"
        trend="+12%"
        color="bg-blue-500"
        delay={0}
      />
      <StatsCard
        icon={<FaTrain className="text-white text-xl" />}
        title="Rute Aktif"
        value="50+"
        trend="+5%"
        color="bg-green-500"
        delay={200}
      />
      <StatsCard
        icon={<FiClock className="text-white text-xl" />}
        title="On Time"
        value="99%"
        trend="+2%"
        color="bg-yellow-500"
        delay={400}
      />
      <StatsCard
        icon={<FiMapPin className="text-white text-xl" />}
        title="Stasiun"
        value="200+"
        trend="+8%"
        color="bg-purple-500"
        delay={600}
      />
    </div>
  );
};

export default EnhancedStatsSection;
