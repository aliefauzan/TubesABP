'use client';

import React from 'react';
import BookingCard from './BookingCard';

// Create train display data from booking, exactly like Flutter implementation
const createTrainFromBooking = (booking: any) => {
  const train = booking.train || {};
  const departureStation = train.departure_station || {};
  const arrivalStation = train.arrival_station || {};

  // Status handling (matching Flutter: displayStatus = statusFromServer.isEmpty ? 'pending' : statusFromServer)
  const statusFromServer = booking.status?.toString() || '';
  const displayStatus = statusFromServer === '' ? 'pending' : statusFromServer;

  // Create full datetime strings for compatibility with format functions
  const fullDepartureDateTime = train.departure_time || new Date().toISOString();
  const fullArrivalDateTime = train.arrival_time || new Date().toISOString();

  return {
    id: train.id?.toString() || booking.train_id?.toString() || Math.random().toString(),
    name: train.name || '',
    operator: train.operator || '',
    
    date: fullDepartureDateTime, // For formatDate function
    time: fullDepartureDateTime, // For formatTime function
    
    departure: departureStation.name || '',
    arrival: arrivalStation.name || '',
    arrivalTime: fullArrivalDateTime,
    duration: train.travel_time || '', 
    classType: train.class_type || '',
    price: train.price?.toString() || '0',
    seatsLeft: train.available_seats || 0, 
    departureStationName: departureStation.name || '', 
    arrivalStationName: arrivalStation.name || '', 
    train_number: train.train_number || '',
  };
};

interface BookingListProps {
  bookings: any[];
  isLoadingAction: boolean;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, isLoadingAction }) => {
  return (
    <div className="space-y-6">
      {bookings.map((booking) => {
        // Log each booking to debug
        console.log('Processing booking:', booking);
        
        const train = createTrainFromBooking(booking);
        const statusFromServer = booking.status?.toString() || '';
        const displayStatus = statusFromServer === '' ? 'pending' : statusFromServer;
        
        return (
          <BookingCard
            key={booking.transaction_id}
            booking={booking}
            train={train}
            displayStatus={displayStatus}
            isLoadingAction={isLoadingAction}
          />
        );
      })}
    </div>
  );
};

export default BookingList;
