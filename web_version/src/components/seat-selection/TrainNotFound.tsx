import Button from '@/components/Button';

interface TrainNotFoundProps {
  onBackToSchedule: () => void;
}

export default function TrainNotFound({ onBackToSchedule }: TrainNotFoundProps) {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Data Tidak Ditemukan</h1>
      <p className="text-gray-600 mb-6">Data kereta tidak ditemukan. Silakan pilih kereta terlebih dahulu.</p>
      <Button onClick={onBackToSchedule}>
        Kembali ke Pencarian
      </Button>
    </div>
  );
}
