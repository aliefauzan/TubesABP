interface SeatLegendProps {
  availableCount: number;
}

export default function SeatLegend({ availableCount }: SeatLegendProps) {
  return (
    <>
      {/* Seat Selection Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1v1a1 1 0 11-2 0v-1H7v1a1 1 0 11-2 0v-1a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" />
          </svg>
          Pilih Kursi Anda
        </h2>
        <p className="text-gray-600">
          {availableCount} kursi tersedia (maksimal 100 kursi)
        </p>
      </div>
      
      {/* Seat Legend */}
      <div className="flex items-center justify-center gap-8 mb-6">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-200 rounded border border-gray-300 mr-2"></div>
          <span className="text-sm text-gray-600">Tersedia</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-primary rounded mr-2"></div>
          <span className="text-sm text-gray-600">Dipilih</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-400 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Tidak Tersedia</span>
        </div>
      </div>
    </>
  );
}
