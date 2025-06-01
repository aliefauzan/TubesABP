'use client';

import React, { useState, useEffect } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  route: string;
  avatar: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Wijaya",
    location: "Jakarta",
    rating: 5,
    comment: "Pelayanan sangat memuaskan! Booking mudah, harga transparan, dan kereta tepat waktu. Akan selalu menggunakan KeretaXpress untuk perjalanan bisnis saya.",
    route: "Jakarta - Bandung",
    avatar: "SW",
    date: "2 hari lalu"
  },
  {
    id: 2,
    name: "Ahmad Rahman",
    location: "Surabaya",
    rating: 5,
    comment: "Aplikasi yang sangat user-friendly. Proses pembayaran cepat dan aman. Customer service responsif ketika ada pertanyaan. Highly recommended!",
    route: "Surabaya - Malang",
    avatar: "AR",
    date: "1 minggu lalu"
  },
  {
    id: 3,
    name: "Maya Sari",
    location: "Yogyakarta",
    rating: 4,
    comment: "Pengalaman pertama menggunakan KeretaXpress dan sangat puas. Interface yang clean, informasi lengkap, dan notifikasi real-time sangat membantu.",
    route: "Yogya - Jakarta",
    avatar: "MS",
    date: "3 hari lalu"
  },
  {
    id: 4,
    name: "Budi Santoso",
    location: "Bandung",
    rating: 5,
    comment: "Sudah 2 tahun menggunakan KeretaXpress untuk liburan keluarga. Selalu dapat promo menarik dan layanan konsisten. Terima kasih KeretaXpress!",
    route: "Bandung - Jakarta",
    avatar: "BS",
    date: "5 hari lalu"
  }
];

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState(2);

  useEffect(() => {
    const updateVisibleTestimonials = () => {
      setVisibleTestimonials(window.innerWidth >= 768 ? 2 : 1);
    };

    updateVisibleTestimonials();
    window.addEventListener('resize', updateVisibleTestimonials);
    return () => window.removeEventListener('resize', updateVisibleTestimonials);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = testimonials.length - visibleTestimonials;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [visibleTestimonials]);

  const nextTestimonial = () => {
    const maxIndex = testimonials.length - visibleTestimonials;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    const maxIndex = testimonials.length - visibleTestimonials;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-4">Apa Kata Pengguna</h2>
        <p className="text-blue-100 text-lg">Testimoni dari pengguna setia KeretaXpress</p>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleTestimonials)}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`flex-shrink-0 px-3 ${
                  visibleTestimonials === 1 ? 'w-full' : 'w-1/2'
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <FaQuoteLeft className="text-blue-300 text-2xl opacity-50" />
                  </div>

                  {/* Comment */}
                  <p className="text-blue-100 text-sm leading-relaxed mb-6 line-clamp-4">
                    "{testimonial.comment}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* User Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">
                          {testimonial.name}
                        </h4>
                        <p className="text-blue-200 text-xs">
                          {testimonial.location} • {testimonial.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-200 text-xs">Route</p>
                      <p className="text-white text-sm font-medium">
                        {testimonial.route}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
        >
          <FiChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
        >
          <FiChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: testimonials.length - visibleTestimonials + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
