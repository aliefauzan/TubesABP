import { FaTrain } from 'react-icons/fa';
import { FiSearch, FiCalendar } from 'react-icons/fi';

interface FloatingActionButtonProps {
  onQuickBookClick: () => void;
  onSearchClick: () => void;
  onHistoryClick: () => void;
  onFeedbackClick: () => void;
}

export default function FloatingActionButton({
  onQuickBookClick,
  onSearchClick,
  onHistoryClick,
  onFeedbackClick,
}: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative group">
        {/* Quick Actions Menu */}
        <div className="absolute bottom-16 right-0 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 space-y-2">
          <button 
            onClick={onQuickBookClick}
            className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
          >
            <FaTrain className="w-4 h-4" />
            <span className="text-sm font-medium">Quick Book</span>
          </button>
          <button 
            onClick={onSearchClick}
            className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
          >
            <FiSearch className="w-4 h-4" />
            <span className="text-sm font-medium">Cari Jadwal</span>
          </button>
          <button 
            onClick={onHistoryClick}
            className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
          >
            <FiCalendar className="w-4 h-4" />
            <span className="text-sm font-medium">Riwayat</span>
          </button>
          <button 
            onClick={onFeedbackClick}
            className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8" />
            </svg>
            <span className="text-sm font-medium">Feedback</span>
          </button>
        </div>
        
        {/* Main FAB */}
        <button 
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500/50 group-hover:rotate-45"
          onClick={onQuickBookClick}
        >
          <FaTrain className="text-xl group-hover:animate-pulse" />
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Quick Book Ticket
        </div>
      </div>
    </div>
  );
}
