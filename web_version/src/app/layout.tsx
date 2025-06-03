import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import BottomNavigation from '@/components/BottomNavigation';
import Footer from '@/components/Footer';
import SvgPatternBackground from '@/components/SvgPatternBackground';
import { ToastProvider } from '@/components/Toast';
import { AuthProvider } from '@/contexts/AuthContext';

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
        <AuthProvider>
          <ToastProvider>
            <SvgPatternBackground className="min-h-screen">
              <EnhancedNavbar />
              <main className="min-h-screen pb-20 pt-20 relative z-10">
                {children}
              </main>
              <Footer />
              <BottomNavigation />
            </SvgPatternBackground>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
