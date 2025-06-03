import Link from 'next/link';
import theme from '@/utils/theme';

interface AuthButtonsProps {
  isVisible: boolean;
}

export default function AuthButtons({ isVisible }: AuthButtonsProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 shadow-xl border-t border-gray-200/50 md:hidden z-40">
      <div className="flex gap-3">
        <Link 
          href="/login"
          className="flex-1 py-3 px-2 border-2 border-blue-500 text-blue-500 font-bold rounded-xl text-center transition-all duration-200 hover:bg-blue-50 hover:shadow-md"
          style={{ borderColor: theme.primaryColor, color: theme.primaryColor }}
        >
          MASUK
        </Link>
        <Link 
          href="/register"
          className="flex-1 py-3 px-2 text-white font-bold rounded-xl text-center transition-all duration-200 hover:opacity-90 hover:shadow-md transform hover:scale-[1.02]"
          style={{ backgroundColor: theme.primaryColor }}
        >
          DAFTAR
        </Link>
      </div>
    </div>
  );
}
