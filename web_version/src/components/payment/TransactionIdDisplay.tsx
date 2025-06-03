interface TransactionIdDisplayProps {
  transactionId: string;
}

export default function TransactionIdDisplay({ transactionId }: TransactionIdDisplayProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-card mb-8">
      <div className="p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 mb-1">ID Transaksi</p>
        <p className="font-mono text-sm font-medium">
          {transactionId || 'Generating...'}
        </p>
      </div>
    </div>
  );
}
