export const formatDate = (dateString: string): string => {
  try {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Tanggal tidak tersedia';
    }
    return date.toLocaleDateString('id-ID', options);
  } catch (error) {
    return 'Tanggal tidak tersedia';
  }
};

export const formatTime = (dateString: string): string => {
  try {
    if (!dateString) return 'Waktu tidak tersedia';
    
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // If it's just a time string like "07:00", try to format it directly
      if (/^\d{2}:\d{2}$/.test(dateString)) {
        return dateString;
      }
      return 'Waktu tidak tersedia';
    }
    return date.toLocaleTimeString('id-ID', options);
  } catch (error) {
    return 'Waktu tidak tersedia';
  }
};

export const formatCurrency = (amount: number): string => {
  try {
    if (isNaN(amount) || amount === null || amount === undefined) {
      return 'Harga tidak tersedia';
    }
    // Format number with Indonesian locale (dots as thousand separators)
    const formattedNumber = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    
    // Return with "Rp " prefix and space
    return `Rp ${formattedNumber}`;
  } catch (error) {
    return 'Harga tidak tersedia';
  }
};

export const calculateDuration = (startTime: string, endTime: string): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMs = end.getTime() - start.getTime();
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
};
