import TrainFrontIndicator from './TrainFrontIndicator';
import SeatGrid from './SeatGrid';
import AdditionalSeats from './AdditionalSeats';

interface SeatMapProps {
  availableSeats: string[];
  selectedSeat: string;
  onSeatClick: (seat: string) => void;
}

export default function SeatMap({ availableSeats, selectedSeat, onSeatClick }: SeatMapProps) {
  return (
    <div className="border border-gray-200 rounded-lg bg-gradient-to-b from-gray-50 to-white">
      <TrainFrontIndicator />
      <SeatGrid 
        availableSeats={availableSeats}
        selectedSeat={selectedSeat}
        onSeatClick={onSeatClick}
      />
      <AdditionalSeats 
        availableSeats={availableSeats}
        selectedSeat={selectedSeat}
        onSeatClick={onSeatClick}
      />
    </div>
  );
}
