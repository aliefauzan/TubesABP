interface BankTransferDetailsProps {
  // No props needed as bank details are static
}

export default function BankTransferDetails({}: BankTransferDetailsProps) {
  return (
    <div className="bg-blue-50 p-5 rounded-lg mb-5 border border-blue-100">
      <div className="mb-3">
        <p className="text-gray-600 text-sm">Bank</p>
        <p className="font-bold">Bank Central Asia (BCA)</p>
      </div>
      
      <div className="mb-3">
        <p className="text-gray-600 text-sm">Nomor Rekening</p>
        <p className="font-bold">1234-5678-9012</p>
      </div>
      
      <div>
        <p className="text-gray-600 text-sm">Nama Rekening</p>
        <p className="font-bold">PT KeretaXpress Indonesia</p>
      </div>
    </div>
  );
}
