interface SeatButtonProps {
  seatNumber: string;
  isAvailable: boolean;
  isSelected: boolean;
  onClick: (seat: string) => void;
}

export default function SeatButton({ seatNumber, isAvailable, isSelected, onClick }: SeatButtonProps) {
  return (
    <button
      disabled={!isAvailable}
      className={`w-12 h-12 rounded-lg text-xs font-bold transition-all duration-200 border-2 ${
        !isAvailable 
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed border-gray-400' 
          : isSelected 
            ? 'bg-primary text-white border-primary shadow-lg scale-105' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300 hover:border-gray-400 hover:shadow-md'
      }`}
      onClick={() => isAvailable && onClick(seatNumber)}
    >
      {seatNumber}
    </button>
  );
}
