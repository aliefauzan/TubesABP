import FormField from './FormField';
import PassengerFormHeader from './PassengerFormHeader';
import GeneralErrorDisplay from './GeneralErrorDisplay';
import SubmitButton from './SubmitButton';

interface PassengerFormData {
  passenger_name: string;
  passenger_id_number: string;
  passenger_dob: string;
  passenger_gender: string;
}

interface PassengerFormErrors {
  passenger_name?: string;
  passenger_id_number?: string;
  passenger_dob?: string;
  passenger_gender?: string;
  general?: string;
}

interface PassengerFormProps {
  formData: PassengerFormData;
  errors: PassengerFormErrors;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PassengerForm({ 
  formData, 
  errors, 
  isLoading, 
  onChange, 
  onSubmit 
}: PassengerFormProps) {
  const nameIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const idIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
    </svg>
  );

  const dateIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const genderIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const genderOptions = [
    { value: 'male', label: 'Laki-laki' },
    { value: 'female', label: 'Perempuan' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-card">
      <PassengerFormHeader />
      
      {errors.general && <GeneralErrorDisplay error={errors.general} />}
      
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          id="passenger_name"
          name="passenger_name"
          type="text"
          label="Nama Lengkap Penumpang"
          placeholder="Masukkan nama lengkap sesuai KTP/Paspor"
          value={formData.passenger_name}
          onChange={onChange}
          error={errors.passenger_name}
          icon={nameIcon}
          required
        />
        
        <FormField
          id="passenger_id_number"
          name="passenger_id_number"
          type="text"
          label="Nomor Identitas (KTP/Paspor)"
          placeholder="Masukkan nomor identitas"
          value={formData.passenger_id_number}
          onChange={onChange}
          error={errors.passenger_id_number}
          icon={idIcon}
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="passenger_dob"
            name="passenger_dob"
            type="date"
            label="Tanggal Lahir"
            value={formData.passenger_dob}
            onChange={onChange}
            error={errors.passenger_dob}
            icon={dateIcon}
            required
          />
          
          <FormField
            id="passenger_gender"
            name="passenger_gender"
            type="select"
            label="Jenis Kelamin"
            value={formData.passenger_gender}
            onChange={onChange}
            error={errors.passenger_gender}
            icon={genderIcon}
            options={genderOptions}
            required
          />
        </div>
        
        <SubmitButton isLoading={isLoading} />
      </form>
    </div>
  );
}
