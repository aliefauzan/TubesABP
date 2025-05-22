import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  SELAMAT DATANG DI<br/>
                  <span className="text-accent">KERETAXPRESS</span>
                </h1>
                <p className="text-xl mb-8 text-gray-100 max-w-lg">
                  Nikmati kemudahan memesan tiket kereta dengan harga terbaik. Perjalanan cepat dan nyaman menanti Anda.
                </p>
                <Link href="/search" className="btn-accent text-lg py-3 px-8 inline-block transform transition hover:scale-105">
                  Cari Tiket Sekarang
                </Link>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-80 h-80">
                  {/* Replace with your actual train illustration */}
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-white/30 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="h-40 w-40 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 15L20 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6.5 15V10C6.5 7.17157 6.5 5.75736 7.37868 4.87868C8.25736 4 9.67157 4 12.5 4H13.5C16.3284 4 17.7426 4 18.6213 4.87868C19.5 5.75736 19.5 7.17157 19.5 10V15" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M14 4V7.5C14 8.88071 12.8807 10 11.5 10C10.1193 10 9 8.88071 9 7.5V4" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M5 20L6.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.5 15L19 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11.5 15L13 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Search Box Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="card max-w-4xl mx-auto transform -translate-y-20 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Cari Tiket Kereta</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Stasiun Asal</label>
                    <select className="input-field">
                      <option value="">Pilih stasiun asal</option>
                      <option value="1">Jakarta Kota</option>
                      <option value="2">Bandung</option>
                      <option value="3">Yogyakarta</option>
                      <option value="4">Surabaya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Stasiun Tujuan</label>
                    <select className="input-field">
                      <option value="">Pilih stasiun tujuan</option>
                      <option value="1">Jakarta Kota</option>
                      <option value="2">Bandung</option>
                      <option value="3">Yogyakarta</option>
                      <option value="4">Surabaya</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Tanggal Keberangkatan</label>
                  <input type="date" className="input-field" />
                </div>
                <div className="flex justify-center">
                  <Link href="/search" className="btn-primary min-w-[200px]">
                    Cari Kereta
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center mb-12">Kenapa Memilih KeretaXpress?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card hover:shadow-xl transition-shadow">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Pemesanan Cepat</h3>
                <p className="text-gray-600">
                  Pesan tiket kurang dari satu menit dengan proses yang sederhana dan mudah digunakan.
                </p>
              </div>
              
              <div className="card hover:shadow-xl transition-shadow">
                <div className="bg-secondary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Harga Terbaik</h3>
                <p className="text-gray-600">
                  Dapatkan penawaran dan diskon terbaik untuk tiket kereta api di seluruh Indonesia.
                </p>
              </div>
              
              <div className="card hover:shadow-xl transition-shadow">
                <div className="bg-accent/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Pembayaran Aman</h3>
                <p className="text-gray-600">
                  Bayar dengan aman menggunakan gateway pembayaran tepercaya untuk ketenangan Anda.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Promo Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="section-title mb-0">Promo Spesial</h2>
              <Link href="/search" className="text-primary font-semibold hover:underline">
                Lihat Semua
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Promo Card 1 */}
              <div className="card hover:shadow-xl transition-shadow overflow-hidden">
                <div className="h-40 bg-gradient-to-r from-blue-600 to-blue-400 relative">
                  <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 rounded-bl-lg font-medium">
                    30% OFF
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="font-bold text-xl">Jakarta - Bandung</div>
                    <div className="text-sm">Mulai dari Rp 80.000</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">Perjalanan cepat dengan kereta Argo Parahyangan. Kursi nyaman dan layanan prima.</p>
                  <Link href="/search" className="text-primary font-medium hover:underline">
                    Pesan Sekarang →
                  </Link>
                </div>
              </div>
              
              {/* Promo Card 2 */}
              <div className="card hover:shadow-xl transition-shadow overflow-hidden">
                <div className="h-40 bg-gradient-to-r from-primary to-primary-light relative">
                  <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 rounded-bl-lg font-medium">
                    20% OFF
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="font-bold text-xl">Jakarta - Yogyakarta</div>
                    <div className="text-sm">Mulai dari Rp 180.000</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">Nikmati perjalanan nyaman ke kota budaya dengan kereta Taksaka Premium.</p>
                  <Link href="/search" className="text-primary font-medium hover:underline">
                    Pesan Sekarang →
                  </Link>
                </div>
              </div>
              
              {/* Promo Card 3 */}
              <div className="card hover:shadow-xl transition-shadow overflow-hidden">
                <div className="h-40 bg-gradient-to-r from-secondary to-blue-400 relative">
                  <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 rounded-bl-lg font-medium">
                    25% OFF
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="font-bold text-xl">Surabaya - Malang</div>
                    <div className="text-sm">Mulai dari Rp 50.000</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">Perjalanan singkat dan nyaman dengan kereta Penataran antar kota di Jawa Timur.</p>
                  <Link href="/search" className="text-primary font-medium hover:underline">
                    Pesan Sekarang →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary-dark to-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Siap Untuk Berpergian?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-100">
              Mulai pesan tiket kereta api sekarang dan nikmati pengalaman perjalanan terbaik.
            </p>
            <Link href="/search" className="btn-accent text-lg py-3 px-8 inline-block transform transition hover:scale-105">
              Cari Kereta
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
