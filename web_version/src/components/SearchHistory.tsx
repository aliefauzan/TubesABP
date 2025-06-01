'use client';

import React, { useState, useEffect } from 'react';
import { FiClock, FiX } from 'react-icons/fi';
import { FaTrain } from 'react-icons/fa';

interface SearchHistoryItem {
  id: string;
  departure: string;
  arrival: string;
  date: string;
  passengers: number;
  timestamp: number;
}

interface SearchHistoryProps {
  onSelectHistory: (item: SearchHistoryItem) => void;
  isVisible: boolean;
  onClose: () => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ onSelectHistory, isVisible, onClose }) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('keretaxpress_search_history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory.slice(0, 5)); // Show only last 5 searches
      } catch (error) {
        console.error('Error parsing search history:', error);
      }
    }
  }, [isVisible]);

  const clearHistory = () => {
    localStorage.removeItem('keretaxpress_search_history');
    setHistory([]);
  };

  const removeHistoryItem = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('keretaxpress_search_history', JSON.stringify(updatedHistory));
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  if (!isVisible || history.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-80 overflow-y-auto">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiClock className="text-gray-500" />
            <h3 className="font-semibold text-gray-800">Pencarian Terakhir</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearHistory}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Hapus Semua
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-2">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group"
            onClick={() => onSelectHistory(item)}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <FaTrain className="text-blue-600 text-sm" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                  <span>{item.departure}</span>
                  <div className="w-4 h-px bg-gray-300"></div>
                  <span>{item.arrival}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatDate(item.timestamp)} • {item.passengers} penumpang
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeHistoryItem(item.id);
              }}
              className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded-full transition-all"
            >
              <FiX className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
