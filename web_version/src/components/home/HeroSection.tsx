import EnhancedStatsSection from '@/components/EnhancedStatsSection';

export default function HeroSection() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-blue-100 border border-white/20">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">Sistem Online 24/7</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg leading-tight">
        Perjalanan Dimulai dari
        <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
          KeretaXpress
        </span>
      </h1>
      <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
        Platform terpercaya untuk pemesanan tiket kereta api di Indonesia.
        Nikmati perjalanan yang nyaman dan terjangkau ke berbagai destinasi.
      </p>
      
      {/* Enhanced Quick Stats */}
      <EnhancedStatsSection />
    </div>
  );
}
