import React from 'react';

interface ResultsSummaryProps {
  totalResults: number;
  filteredResults: number;
  sortBy: 'time' | 'price' | 'duration' | 'seats';
  sortOrder: 'asc' | 'desc';
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  totalResults,
  filteredResults,
  sortBy,
  sortOrder
}) => {
  const getSortLabel = (sortBy: string) => {
    switch (sortBy) {
      case 'time': return 'waktu';
      case 'price': return 'harga';
      case 'duration': return 'durasi';
      case 'seats': return 'kursi tersisa';
      default: return 'waktu';
    }
  };

  return (
    <div className="mb-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center gap-2 text-blue-800">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">
          Ditemukan {filteredResults} kereta
          {totalResults !== filteredResults && ` dari ${totalResults} total`}
        </span>
      </div>
      <div className="text-sm text-blue-600">
        Diurutkan berdasarkan {getSortLabel(sortBy)} ({sortOrder === 'asc' ? 'naik' : 'turun'})
      </div>
    </div>
  );
};

export default ResultsSummary;
