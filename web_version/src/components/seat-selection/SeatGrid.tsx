import SeatButton from './SeatButton';

interface SeatGridProps {
  availableSeats: string[];
  selectedSeat: string;
  onSeatClick: (seat: string) => void;
}

export default function SeatGrid({ availableSeats, selectedSeat, onSeatClick }: SeatGridProps) {
  const maxSeats = 100;
  
  // Extract row numbers from available A seats and generate enough rows
  const availableRowNumbers = availableSeats
    .filter(seat => seat.startsWith('A'))
    .map(seat => parseInt(seat.substring(1)))
    .filter(num => !isNaN(num) && num <= maxSeats);
  
  const maxRowFromData = Math.max(...availableRowNumbers, 0);
  const maxRowFromSeats = Math.ceil(Math.min(availableSeats.length, maxSeats) / 4);
  const maxRow = Math.min(Math.max(maxRowFromData, maxRowFromSeats, 10), 25);

  const generateRows = () => {
    const rows = [];
    
    for (let row = 1; row <= maxRow; row++) {
      const rowSeats = [];
      
      // Left side seats (A1, A2)
      for (let seatPos = 1; seatPos <= 2; seatPos++) {
        const seatNumber = `A${(row - 1) * 4 + seatPos}`;
        const seatNumericValue = (row - 1) * 4 + seatPos;
        
        if (seatNumericValue > maxSeats) continue;
        
        const isAvailable = availableSeats.includes(seatNumber);
        const isSelected = selectedSeat === seatNumber;
        
        rowSeats.push(
          <SeatButton
            key={seatNumber}
            seatNumber={seatNumber}
            isAvailable={isAvailable}
            isSelected={isSelected}
            onClick={onSeatClick}
          />
        );
      }
      
      // Aisle space
      rowSeats.push(<div key={`aisle-${row}`} className="w-8"></div>);
      
      // Right side seats (A3, A4)
      for (let seatPos = 3; seatPos <= 4; seatPos++) {
        const seatNumber = `A${(row - 1) * 4 + seatPos}`;
        const seatNumericValue = (row - 1) * 4 + seatPos;
        
        if (seatNumericValue > maxSeats) continue;
        
        const isAvailable = availableSeats.includes(seatNumber);
        const isSelected = selectedSeat === seatNumber;
        
        rowSeats.push(
          <SeatButton
            key={seatNumber}
            seatNumber={seatNumber}
            isAvailable={isAvailable}
            isSelected={isSelected}
            onClick={onSeatClick}
          />
        );
      }
      
      // Only add the row if it contains seats within the 100 limit
      const hasValidSeats = rowSeats.some(seat => seat.key && typeof seat.key === 'string' && seat.key.startsWith('A'));
      if (hasValidSeats && (row - 1) * 4 + 1 <= maxSeats) {
        rows.push(
          <div key={row} className="flex items-center justify-center space-x-2">
            {rowSeats}
            <div className="ml-3 text-xs text-gray-400 w-6 text-center">{row}</div>
          </div>
        );
      }
    }
    
    return rows;
  };

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto space-y-3">
        {generateRows()}
      </div>
    </div>
  );
}
