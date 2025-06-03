import Button from '@/components/Button';

interface SelectionSummaryProps {
  selectedSeat: string;
  onContinue: () => void;
}

export default function SelectionSummary({ selectedSeat, onContinue }: SelectionSummaryProps) {
  return (
    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-center md:text-left">
        {selectedSeat ? (
          <div className="flex items-center justify-center md:justify-start">
            <div className="w-8 h-8 bg-primary rounded mr-3 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-800">Kursi Dipilih</p>
              <p className="text-primary font-bold text-lg">{selectedSeat}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center md:justify-start text-gray-500">
            <div className="w-8 h-8 bg-gray-200 rounded mr-3 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1v1a1 1 0 11-2 0v-1H7v1a1 1 0 11-2 0v-1a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Belum ada kursi dipilih</p>
              <p className="text-sm">Pilih kursi untuk melanjutkan</p>
            </div>
          </div>
        )}
      </div>
      <Button
        variant="primary"
        onClick={onContinue}
        disabled={!selectedSeat}
        className="w-full md:w-auto px-8 py-3"
      >
        {selectedSeat ? 'Lanjutkan ke Data Penumpang' : 'Pilih Kursi Terlebih Dahulu'}
      </Button>
    </div>
  );
}
