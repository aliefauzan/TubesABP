import { FiCreditCard } from 'react-icons/fi';
import BankTransferDetails from './BankTransferDetails';
import PaymentNotes from './PaymentNotes';

interface PaymentInstructionsProps {
  transactionId: string;
  totalAmount: string;
}

export default function PaymentInstructions({ transactionId, totalAmount }: PaymentInstructionsProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-card mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center justify-center">
        <FiCreditCard className="w-5 h-5 mr-2 text-primary" />
        Petunjuk Pembayaran
      </h2>
      
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-3 text-primary">Transfer Bank</h3>
        <p className="mb-4">Silakan transfer jumlah yang tepat ke rekening berikut:</p>
        
        <BankTransferDetails />
        
        <PaymentNotes 
          transactionId={transactionId}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  );
}
