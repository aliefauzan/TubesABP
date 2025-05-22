export interface User {
  id: number;
  uuid: string;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Train {
  id: number;
  name: string;
  operator: string;
  departure_station_id: number;
  arrival_station_id: number;
  departure_time: string;
  arrival_time: string;
  duration_minutes: number;
  class_type: string;
  price: number;
  available_seats: number;
  created_at?: string;
  updated_at?: string;
  departureStation?: Station;
  arrivalStation?: Station;
}

export interface Station {
  id: number;
  name: string;
  city: string;
  address: string;
  created_at?: string;
  updated_at?: string;
}

export interface Booking {
  id: number;
  transaction_id: string;
  user_uuid: string;
  train_id: number;
  travel_date: string;
  passenger_name: string;
  passenger_id_number: string;
  passenger_dob: string;
  passenger_gender: 'male' | 'female';
  seat_number: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'paid';
  total_price: number;
  payment_proof?: string;
  payment_method: string;
  created_at?: string;
  updated_at?: string;
  train?: Train;
}

export interface AuthResponse {
  user: User;
  token: string;
}
