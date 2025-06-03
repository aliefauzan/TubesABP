interface AdditionalSeatsProps {
  availableSeats: string[];
  selectedSeat: string;
  onSeatClick: (seat: string) => void;
}

export default function AdditionalSeats({ availableSeats, selectedSeat, onSeatClick }: AdditionalSeatsProps) {
  if (availableSeats.length <= 40) {
    return null;
  }

  const additionalSeats = availableSeats
    .filter(seat => {
      const seatNum = parseInt(seat.substring(1));
      return seat.startsWith('A') && !isNaN(seatNum) && seatNum <= 100;
    })
    .slice(40, 100);

  if (additionalSeats.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <p className="text-center text-sm text-gray-600 mb-3">Kursi A Tambahan Tersedia:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {additionalSeats.map((seat) => (
          <button
            key={seat}
            className={`w-10 h-10 rounded text-xs font-bold transition-all duration-200 ${
              selectedSeat === seat
                ? 'bg-primary text-white shadow-md scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
            }`}
            onClick={() => onSeatClick(seat)}
          >
            {seat}
          </button>
        ))}
      </div>
    </div>
  );
}
