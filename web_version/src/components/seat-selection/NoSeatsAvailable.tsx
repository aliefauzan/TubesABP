interface NoSeatsAvailableProps {
  // No props needed for this component
}

export default function NoSeatsAvailable({}: NoSeatsAvailableProps) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
      <p className="text-center">Tidak ada kursi yang tersedia untuk kereta ini. Silakan pilih kereta lain.</p>
    </div>
  );
}
