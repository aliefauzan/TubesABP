import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TopHeader from '@/components/TopHeader';
import BottomNavigation from '@/components/BottomNavigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KeretaXpress - Pemesanan Tiket Kereta',
  description: 'Pesan tiket kereta dengan mudah, cepat, dan aman.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <TopHeader />
        <main className="min-h-screen bg-gray-50 pb-20">
          {children}
        </main>
        <BottomNavigation />
      </body>
    </html>
  );
}
