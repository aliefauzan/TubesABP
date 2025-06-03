import { FaTrain } from 'react-icons/fa';
import AnimatedCard from '@/components/AnimatedCard';

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaTrain className="text-white text-xl" />,
      iconBg: 'bg-blue-500',
      title: 'Booking Mudah',
      description: 'Pesan tiket dalam hitungan menit dengan antarmuka yang user-friendly',
      delay: 0.2
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: 'bg-green-500',
      title: 'Pembayaran Aman',
      description: 'Berbagai metode pembayaran yang aman dan terpercaya',
      delay: 0.4
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: 'bg-yellow-500',
      title: 'Real-time Info',
      description: 'Informasi jadwal dan status kereta secara real-time',
      delay: 0.6
    }
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-4">Mengapa Memilih KeretaXpress?</h2>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">Nikmati pengalaman perjalanan terbaik dengan layanan terdepan</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <AnimatedCard key={index} delay={feature.delay}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}
