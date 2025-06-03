'use client';

import React from 'react';
import Link from 'next/link';
import { FaTrain, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const footerLinks = [
    {
      title: 'Layanan',
      links: [
        { name: 'Pesan Tiket', href: '#search' },
        { name: 'Cek Jadwal', href: '/schedule' },
        { name: 'Riwayat Pemesanan', href: '/booking-history' },
        { name: 'Pilih Kursi', href: '/seat-selection' }
      ]
    },
    {
      title: 'Akun',
      links: [
        { name: 'Masuk', href: '/login' },
        { name: 'Daftar', href: '/register' },
        { name: 'Info Penumpang', href: '/passenger-info' },
        { name: 'Pembayaran', href: '/payment' }
      ]
    },
    {
      title: 'Perusahaan',
      links: [
        { name: 'Tentang Kami', href: '#about' },
        { name: 'Fitur Unggulan', href: '#features' },
        { name: 'Testimoni', href: '#testimonials' },
        { name: 'Kontak', href: '#contact' }
      ]
    },
    {
      title: 'Bantuan',
      links: [
        { name: 'Panduan Booking', href: '#guide' },
        { name: 'Customer Service', href: '#contact' },
        { name: 'Lapor Masalah', href: '#feedback' },
        { name: 'Tips Perjalanan', href: '#tips' }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: <FaPhone className="w-4 h-4" />,
      title: 'Customer Service',
      content: '0804-1-KERETA (537382)',
      subContent: '24/7 Support'
    },
    {
      icon: <FaEnvelope className="w-4 h-4" />,
      title: 'Email',
      content: 'info@keretaxpress.co.id',
      subContent: 'Respon dalam 24 jam'
    },
    {
      icon: <FaMapMarkerAlt className="w-4 h-4" />,
      title: 'Kantor Pusat',
      content: 'Jakarta Pusat, Indonesia',
      subContent: 'Senin - Jumat, 08:00 - 17:00'
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: '#', name: 'Facebook' },
    { icon: <FaTwitter />, href: '#', name: 'Twitter' },
    { icon: <FaInstagram />, href: '#', name: 'Instagram' },
    { icon: <FaLinkedin />, href: '#', name: 'LinkedIn' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-blue-900 via-blue-950 to-gray-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
              <circle cx="5" cy="5" r="0.5" fill="currentColor" />
              <circle cx="15" cy="15" r="0.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="relative">
        {/* Newsletter Section */}
        <div className="border-b border-blue-800/50">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Dapatkan Update Terbaru</h3>
              <p className="text-blue-200">Berlangganan newsletter untuk promo eksklusif dan info perjalanan</p>
            </div>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/15 transition-all duration-200"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Berlangganan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
                  <FaTrain className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">KeretaXpress</h3>
                  <p className="text-blue-200 text-sm">Perjalanan Cepat & Nyaman</p>
                </div>
              </div>
              <p className="text-blue-200 mb-6 leading-relaxed">
                Platform booking tiket kereta terpercaya di Indonesia. Nikmati perjalanan yang aman, 
                nyaman, dan tepat waktu dengan KeretaXpress.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.name}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-lg font-semibold text-white">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-blue-200 hover:text-white transition-colors duration-200 hover:underline focus:outline-none focus:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="border-t border-blue-800/50 pt-8 mb-8">
            <h4 className="text-lg font-semibold mb-6 text-center">Hubungi Kami</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((contact, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-600/20 rounded-lg mb-3">
                    {contact.icon}
                  </div>
                  <h5 className="font-semibold text-white mb-1">{contact.title}</h5>
                  <p className="text-blue-200">{contact.content}</p>
                  <p className="text-blue-300 text-sm">{contact.subContent}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-blue-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-blue-200">
                © {currentYear} KeretaXpress. All rights reserved.
              </p>
              <p className="text-blue-300 text-sm">
                Developed with ❤️ for better travel experiences
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-blue-200 text-sm">Kembali ke atas</span>
              <button
                onClick={scrollToTop}
                className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 group"
                aria-label="Scroll to top"
              >
                <FiArrowUp className="w-4 h-4 group-hover:animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
