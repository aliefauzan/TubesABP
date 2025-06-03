// Application-wide constants

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SCHEDULE: '/schedule',
  SEAT_SELECTION: '/seat-selection',
  PASSENGER_INFO: '/passenger-info',
  PAYMENT: '/payment',
  PAYMENT_SUCCESS: '/payment-success',
  BOOKING_HISTORY: '/booking-history',
  SEATS: '/seats'
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  SELECTED_TRAIN: 'selectedTrain',
  TRAVEL_DATE: 'travelDate',
  CURRENT_BOOKING: 'currentBooking',
  PASSENGER_DATA: 'passengerData',
  SELECTED_SEAT: 'selectedSeat'
} as const;

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  
  // Stations
  STATIONS: '/stations',
  
  // Trains
  TRAINS_ALL: '/trains/all',
  TRAINS_SEARCH: '/trains/search',
  TRAINS_PROMO: '/trains/promo',
  AVAILABLE_SEATS: '/trains/{id}/available-seats',
  
  // Bookings
  BOOKINGS: '/bookings',
  BOOKING_HISTORY: '/bookings/history',
  BOOKING_STATUS: '/bookings/{id}/status',
  
  // Payments
  PAYMENT_UPLOAD: '/payments/{id}/upload'
} as const;

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PAID: 'paid',
  CANCELLED: 'cancelled'
} as const;

export const BOOKING_STATUS_LABELS = {
  [BOOKING_STATUS.PENDING]: 'Menunggu Pembayaran',
  [BOOKING_STATUS.CONFIRMED]: 'Dikonfirmasi',
  [BOOKING_STATUS.PAID]: 'Sudah Dibayar',
  [BOOKING_STATUS.CANCELLED]: 'Dibatalkan'
} as const;

export const SEAT_STATUS = {
  AVAILABLE: 'available',
  SELECTED: 'selected',
  OCCUPIED: 'occupied'
} as const;

export const TRAIN_CLASSES = [
  'Semua',
  'Ekonomi',
  'Bisnis',
  'Eksekutif'
] as const;

export const SORT_OPTIONS = [
  { value: 'time', label: 'Waktu Keberangkatan' },
  { value: 'price', label: 'Harga' },
  { value: 'duration', label: 'Durasi Perjalanan' },
  { value: 'seats', label: 'Kursi Tersedia' }
] as const;

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Laki-laki' },
  { value: 'female', label: 'Perempuan' }
] as const;

export const PAYMENT_METHODS = [
  { value: 'bank_transfer', label: 'Transfer Bank' },
  { value: 'e_wallet', label: 'E-Wallet' },
  { value: 'credit_card', label: 'Kartu Kredit' }
] as const;

export const ANIMATION_DELAYS = {
  SHORT: 500,
  MEDIUM: 1000,
  LONG: 1500
} as const;

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+62|62|0)8[1-9][0-9]{6,10}$/,
  ID_CARD: /^[0-9]{16}$/,
  NAME: /^[a-zA-Z\s]+$/
} as const;

export const ERROR_MESSAGES = {
  REQUIRED: 'Field ini wajib diisi',
  INVALID_EMAIL: 'Format email tidak valid',
  INVALID_PHONE: 'Format nomor telepon tidak valid',
  INVALID_ID_CARD: 'NIK harus 16 digit angka',
  INVALID_NAME: 'Nama hanya boleh mengandung huruf dan spasi',
  PASSWORD_MIN_LENGTH: 'Password minimal 6 karakter',
  PASSWORDS_NOT_MATCH: 'Password tidak sama',
  NETWORK_ERROR: 'Terjadi kesalahan jaringan',
  SERVER_ERROR: 'Terjadi kesalahan server',
  UNAUTHORIZED: 'Anda tidak memiliki akses',
  NOT_FOUND: 'Data tidak ditemukan'
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login berhasil!',
  REGISTER_SUCCESS: 'Registrasi berhasil!',
  BOOKING_SUCCESS: 'Pemesanan berhasil dibuat!',
  PAYMENT_SUCCESS: 'Pembayaran berhasil dikonfirmasi!',
  UPDATE_SUCCESS: 'Data berhasil diperbarui!'
} as const;
