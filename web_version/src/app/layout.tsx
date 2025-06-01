import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import BottomNavigation from '@/components/BottomNavigation';
import EnhancedFooter from '@/components/EnhancedFooter';
import SvgPatternBackground from '@/components/SvgPatternBackground';
import { ToastProvider } from '@/components/Toast';

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
        <ToastProvider>
          <SvgPatternBackground className="min-h-screen">
            <EnhancedNavbar />
            <main className="min-h-screen pb-20 pt-20 relative z-10">
              {children}
            </main>
            <EnhancedFooter />
            <BottomNavigation />
          </SvgPatternBackground>
        </ToastProvider>
      </body>
    </html>
  );
}
