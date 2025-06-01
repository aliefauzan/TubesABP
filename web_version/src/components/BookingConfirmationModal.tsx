'use client';

import React, { useState, useEffect } from 'react';
import { FiX, FiCalendar, FiClock, FiUsers, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { FaTrain, FaCheckCircle } from 'react-icons/fa';

interface BookingDetails {
  departure: string;
  arrival: string;
  date: string;
  time: string;
  passengers: number;
  trainClass: string;
  price: number;
  duration: string;
}

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookingDetails: BookingDetails | null;
}

const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  bookingDetails
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'confirm' | 'processing' | 'success'>('confirm');

  useEffect(() => {
    if (isOpen) {
      setStep('confirm');
      setIsProcessing(false);
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    setIsProcessing(true);
    setStep('processing');

    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setStep('success');
    setIsProcessing(false);
  };

  const handleClose = () => {
    if (step === 'success') {
      onConfirm();
    }
    onClose();
  };

  if (!isOpen || !bookingDetails) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        
        {step === 'confirm' && (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaTrain className="text-xl" />
                  <h3 className="text-lg font-bold">Konfirmasi Pemesanan</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-200"
                  disabled={isProcessing}
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Route Information */}
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-900 truncate">{bookingDetails.departure}</span>
                  </div>
                  <FiArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div className="flex items-center gap-2">
                    <FiMapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-900 truncate">{bookingDetails.arrival}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">{bookingDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">{bookingDetails.time}</span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Detail Pemesanan</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Kelas Kereta</span>
                    <span className="font-medium text-gray-900">{bookingDetails.trainClass}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Penumpang</span>
                    <div className="flex items-center gap-1">
                      <FiUsers className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">{bookingDetails.passengers} orang</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Durasi Perjalanan</span>
                    <span className="font-medium text-gray-900">{bookingDetails.duration}</span>
                  </div>
                </div>
              </div>              {/* Price Summary */}
              <div className="bg-blue-50 rounded-xl p-5">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Harga</span>
                  <span className="text-2xl font-bold text-blue-600">
                    Rp {bookingDetails.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Sudah termasuk biaya admin dan asuransi
                </p>
              </div>

              {/* Terms */}
              <div className="text-xs text-gray-500 space-y-1">
                <p>• Tiket yang sudah dibeli tidak dapat dibatalkan</p>
                <p>• Harap hadir 30 menit sebelum keberangkatan</p>
                <p>• Bawa dokumen identitas asli saat perjalanan</p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                disabled={isProcessing}
              >
                Batal
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                disabled={isProcessing}
              >
                Konfirmasi Pesan
              </button>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Memproses Pemesanan</h3>
            <p className="text-gray-600 mb-4">Mohon tunggu sebentar...</p>
            <div className="flex justify-center gap-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <FaCheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pemesanan Berhasil!</h3>
            <p className="text-gray-600 mb-6">
              Tiket Anda telah berhasil dipesan. Silakan cek email untuk detail lebih lanjut.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              Lihat Tiket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
