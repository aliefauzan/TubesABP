import React from 'react';
import { FiClock, FiChevronRight } from 'react-icons/fi';
import { Station } from '@/types';

interface RecentSearch {
  id: number;
  departure: string;
  arrival: string;
  date: string;
  timestamp: string;
}

interface RecentSearchesProps {
  recentSearches: RecentSearch[];
  stations: Station[];
  onSearchSelect: (departureId: number, arrivalId: number, date: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({
  recentSearches,
  stations,
  onSearchSelect
}) => {
  if (recentSearches.length === 0) {
    return null;
  }

  const handleSearchClick = (search: RecentSearch) => {
    const depStation = stations.find(s => s.name === search.departure);
    const arrStation = stations.find(s => s.name === search.arrival);
    if (depStation && arrStation) {
      onSearchSelect(depStation.id, arrStation.id, search.date);
    }
  };

  return (
    <div className="mb-12">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiClock className="h-5 w-5" />
          Pencarian Terakhir
        </h3>
        <div className="space-y-3">
          {recentSearches.slice(0, 3).map((search) => (
            <button
              key={search.id}
              onClick={() => handleSearchClick(search)}
              className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base font-semibold text-gray-800">
                    {search.departure} → {search.arrival}
                  </div>
                  <div className="text-sm text-gray-500">{search.date}</div>
                </div>
                <FiChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSearches;
