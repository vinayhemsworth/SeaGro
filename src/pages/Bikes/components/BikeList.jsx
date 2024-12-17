import React from 'react';
import { Battery, MapPin, Clock, Star } from 'lucide-react';

export function BikeList() {
  const bikes = [
    {
      id: 1,
      name: 'City Cruiser E-Bike',
      type: 'Electric',
      location: 'Central Park Station',
      distance: '0.3 miles',
      battery: 85,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Mountain Explorer',
      type: 'Regular',
      location: 'Downtown Hub',
      distance: '0.5 miles',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'Urban Commuter',
      type: 'Electric',
      location: 'Tech District',
      distance: '0.8 miles',
      battery: 92,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1565892361067-51ae1dd68ee7?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="space-y-4">
      {bikes.map((bike) => (
        <div
          key={bike.id}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start space-x-4">
            <img
              src={bike.image}
              alt={bike.name}
              className="w-32 h-32 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {bike.name}
                  </h3>
                  <p className="text-gray-600">{bike.type}</p>
                </div>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{bike.rating}</span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{bike.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{bike.distance}</span>
                </div>
                {bike.battery && (
                  <div className="flex items-center text-gray-600">
                    <Battery className="w-4 h-4 mr-1" />
                    <span>{bike.battery}%</span>
                  </div>
                )}
              </div>
              
              <button className="mt-4 w-full px-4 py-2 bg-teal-50 text-teal-700 rounded-xl hover:bg-teal-100 transition-colors">
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}