interface PaymentNotesProps {
  transactionId: string;
  totalAmount: string;
}

export default function PaymentNotes({ transactionId, totalAmount }: PaymentNotesProps) {
  return (
    <div className="text-sm bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
      <p className="font-bold mb-2 text-yellow-800">Catatan Penting:</p>
      <ul className="list-disc pl-5 space-y-1 text-yellow-800">
        <li>Sertakan ID Transaksi ({transactionId || 'Generating...'}) dalam referensi transfer</li>
        <li>Transfer jumlah yang tepat: {totalAmount}</li>
        <li>Klik tombol &quot;Konfirmasi Pembayaran&quot; setelah transfer selesai</li>
      </ul>
    </div>
  );
}
