export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface Train {
  id: string;
  name: string;
  operator: string;
  date: string;
  time: string;
  departure: string;
  arrival: string;
  arrivalTime: string;
  duration: string;
  classType: string;
  price: string;
  seatsLeft: number;
  departureStationName?: string;
  arrivalStationName?: string;
}

export interface Station {
  id: number;
  name: string;
  city: string;
}

export interface Passenger {
  name: string;
  idCardNumber: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
}

export interface Booking {
  transactionId: string;
  trainName: string;
  operator: string;
  date: string;
  time: string;
  departure: string;
  arrival: string;
  arrivalTime: string;
  status: string;
  price: string;
  passengerName: string;
  passengerId: string;
  passengerDob: string;
  passengerGender: string;
  seatClass: string;
  seatNumber: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
