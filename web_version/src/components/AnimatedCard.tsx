'use client';

import React from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <div 
      className={`transform transition-all duration-500 hover:scale-105 hover:shadow-card-hover ${className}`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
