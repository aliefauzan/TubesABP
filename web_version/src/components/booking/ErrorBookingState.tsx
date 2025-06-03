'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { FiAlertCircle } from 'react-icons/fi';

interface ErrorBookingStateProps {
  error: string;
}

const ErrorBookingState: React.FC<ErrorBookingStateProps> = ({ error }) => {
  const router = useRouter();

  return (
    <div className="text-center py-16 bg-red-50 rounded-xl border-2 border-red-200 shadow-sm mb-8">
      <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center bg-red-100 rounded-full">
        <FiAlertCircle className="text-4xl text-red-600" />
      </div>
      <h3 className="text-2xl font-bold text-red-800 mb-4">Gagal Memuat Data</h3>
      <p className="text-lg text-red-700 mb-6 max-w-md mx-auto">{error}</p>
      {error.includes("login") && (
        <Button 
          onClick={() => router.push('/login')} 
          variant="secondary" 
          size="lg" 
          className="bg-red-600 text-white hover:bg-red-700 px-8"
        >
          Login Sekarang
        </Button>
      )}
    </div>
  );
};

export default ErrorBookingState;
