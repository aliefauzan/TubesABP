'use client';

import React, { useState, useEffect } from 'react';

interface SvgPatternBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

const SvgPatternBackground: React.FC<SvgPatternBackgroundProps> = ({ children, className }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Adjust sensitivity by dividing the mouse position
      const sensitivity = 10; // Lower value = more movement
      setMousePosition({
        x: (event.clientX / window.innerWidth - 0.5) * window.innerWidth / sensitivity,
        y: (event.clientY / window.innerHeight - 0.5) * window.innerHeight / sensitivity,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);  return (
    <div className={`relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 ${className}`}>      {/* Animated SVG Background */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            backgroundRepeat: 'repeat',
            backgroundSize: '60px 60px',
            willChange: 'transform',
          }}
        />
      </div>
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-indigo-800/30" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SvgPatternBackground;
