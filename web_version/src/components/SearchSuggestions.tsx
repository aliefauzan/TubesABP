'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiMapPin, FiClock, FiTrendingUp, FiStar } from 'react-icons/fi';
import { FaTrain } from 'react-icons/fa';

interface SearchSuggestion {
  type: 'station' | 'route' | 'recent' | 'popular';
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: string;
  frequency?: number;
}

interface SearchSuggestionsProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (suggestion: SearchSuggestion) => void;
  searchType: 'departure' | 'arrival';
  currentValue: string;
  excludeStationId?: string;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  isOpen,
  onClose,
  onSelect,
  searchType,
  currentValue,
  excludeStationId
}) => {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mock data - in real app, this would come from API
  const mockStations = [
    { id: '1', name: 'Jakarta Pusat (Gambir)', code: 'GMR', popular: true },
    { id: '2', name: 'Jakarta Kota', code: 'JKT', popular: true },
    { id: '3', name: 'Bandung', code: 'BD', popular: true },
    { id: '4', name: 'Yogyakarta Tugu', code: 'YK', popular: true },
    { id: '5', name: 'Surabaya Gubeng', code: 'SGU', popular: true },
    { id: '6', name: 'Semarang Tawang', code: 'SMT', popular: false },
    { id: '7', name: 'Cirebon', code: 'CN', popular: false },
    { id: '8', name: 'Solo Balapan', code: 'SLO', popular: false }
  ];

  const mockPopularRoutes = [
    { from: 'Jakarta Pusat', to: 'Bandung', frequency: 95 },
    { from: 'Jakarta Pusat', to: 'Yogyakarta', frequency: 87 },
    { from: 'Surabaya Gubeng', to: 'Jakarta Pusat', frequency: 78 },
    { from: 'Bandung', to: 'Jakarta Pusat', frequency: 72 }
  ];

  useEffect(() => {
    if (!isOpen) return;

    const generateSuggestions = () => {
      const newSuggestions: SearchSuggestion[] = [];

      // Recent searches (from localStorage)
      try {
        const recentSearches = JSON.parse(localStorage.getItem('keretaxpress_search_history') || '[]');
        const recentStations = recentSearches
          .slice(0, 3)
          .map((search: any) => ({
            type: 'recent' as const,
            id: `recent-${searchType}-${search.id}`,
            title: searchType === 'departure' ? search.departure : search.arrival,
            subtitle: 'Pencarian terbaru',
            icon: <FiClock className="w-4 h-4 text-gray-400" />,
            badge: 'Recent'
          }))
          .filter((item: any) => item.title && item.title !== excludeStationId);

        newSuggestions.push(...recentStations);
      } catch (error) {
        console.error('Error parsing recent searches:', error);
      }

      // Filter stations based on search input
      const filteredStations = mockStations
        .filter(station => 
          station.name.toLowerCase().includes(currentValue.toLowerCase()) &&
          station.id !== excludeStationId
        )
        .slice(0, 6)
        .map(station => ({
          type: 'station' as const,
          id: station.id,
          title: station.name,
          subtitle: `Kode: ${station.code}`,
          icon: <FiMapPin className="w-4 h-4 text-blue-500" />,
          badge: station.popular ? 'Popular' : undefined
        }));

      newSuggestions.push(...filteredStations);

      // Popular routes (only if no search input)
      if (!currentValue.trim()) {
        const popularRouteSuggestions = mockPopularRoutes
          .slice(0, 3)
          .map((route, index) => ({
            type: 'route' as const,
            id: `route-${index}`,
            title: searchType === 'departure' ? route.from : route.to,
            subtitle: `${route.frequency}% pengguna memilih rute ini`,
            icon: <FiTrendingUp className="w-4 h-4 text-green-500" />,
            badge: 'Trending',
            frequency: route.frequency
          }));

        newSuggestions.push(...popularRouteSuggestions);
      }

      // Remove duplicates and limit results
      const uniqueSuggestions = newSuggestions
        .filter((item, index, self) => 
          index === self.findIndex(t => t.title === item.title)
        )
        .slice(0, 8);

      setSuggestions(uniqueSuggestions);
      setSelectedIndex(-1);
    };

    generateSuggestions();
  }, [isOpen, currentValue, searchType, excludeStationId]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          onSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, selectedIndex, suggestions]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedIndex]);

  if (!isOpen || suggestions.length === 0) return null;

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Popular': return 'bg-blue-100 text-blue-600';
      case 'Trending': return 'bg-green-100 text-green-600';
      case 'Recent': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 max-h-80 overflow-y-auto">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-lg">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaTrain className="w-4 h-4" />
            <span className="font-medium">
              Pilih stasiun {searchType === 'departure' ? 'keberangkatan' : 'tujuan'}
            </span>
          </div>
        </div>

        {/* Suggestions List */}
        <div className="py-2">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              ref={el => suggestionRefs.current[index] = el}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150 ${
                index === selectedIndex
                  ? 'bg-blue-50 border-l-4 border-blue-500'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onSelect(suggestion)}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                {suggestion.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {suggestion.title}
                  </h4>
                  {suggestion.badge && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(suggestion.badge)}`}>
                      {suggestion.badge}
                    </span>
                  )}
                </div>
                {suggestion.subtitle && (
                  <p className="text-xs text-gray-500 truncate">
                    {suggestion.subtitle}
                  </p>
                )}
              </div>

              {/* Frequency indicator */}
              {suggestion.frequency && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <FiStar className="w-3 h-3" />
                  <span>{suggestion.frequency}%</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 rounded-b-lg">
          <p className="text-xs text-gray-500 text-center">
            Gunakan ↑↓ untuk navigasi, Enter untuk memilih, Esc untuk menutup
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;
