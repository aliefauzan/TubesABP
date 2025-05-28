'use client';

import { Train } from '@/types';
import Button from './Button';

interface TrainCardProps {
  train: Train;
  onSelect: (train: Train) => void;
}

const TrainCard = ({ train, onSelect }: TrainCardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-xl">
      <div className="p-5">
        {/* Train header */}
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="mb-3 md:mb-0">
            <h3 className="text-xl font-bold text-primary">{train.name}</h3>
            <div className="flex items-center mt-1">
              <span className="px-2 py-0.5 bg-blue-100 text-primary text-xs font-medium rounded-full">
                {train.classType}
              </span>
              <span className="text-sm text-gray-500 ml-2">{train.operator}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-secondary">
              {train.price}
            </p>
            <div className="flex items-center justify-end mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="text-sm text-gray-500">
                {train.seatsLeft} kursi tersedia
              </span>
            </div>
          </div>
        </div>
        
        {/* Train journey details */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
          {/* Departure info */}
          <div className="md:col-span-4">
            <p className="text-xl font-bold text-gray-800">{train.time}</p>
            <p className="font-medium text-gray-700 mt-1">{train.departureStationName}</p>
            <p className="text-sm text-gray-500">{train.departure}</p>
          </div>
          
          {/* Duration */}
          <div className="md:col-span-3">
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500 mb-2">
                {train.duration}
              </p>
              <div className="relative w-full">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2"></div>
                <div className="absolute left-0 w-3 h-3 rounded-full bg-primary -translate-y-1/2"></div>
                <div className="absolute right-0 w-3 h-3 rounded-full bg-secondary -translate-y-1/2"></div>
              </div>
            </div>
          </div>
          
          {/* Arrival info */}
          <div className="md:col-span-4 text-right">
            <p className="text-xl font-bold text-gray-800">{train.arrivalTime}</p>
            <p className="font-medium text-gray-700 mt-1">{train.arrivalStationName}</p>
            <p className="text-sm text-gray-500">{train.arrival}</p>
          </div>
        </div>
      </div>
      
      {/* Card footer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <Button 
          variant="primary" 
          onClick={() => onSelect(train)}
          className="w-full"
        >
          <div className="flex items-center justify-center">
            <span>Pilih Kereta</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default TrainCard;
