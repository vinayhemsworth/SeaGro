import React from 'react';
import { Battery, MapPin, Bike, Sliders } from 'lucide-react';

export function BikeFilters() {
  const filters = {
    type: ['All Bikes', 'Electric', 'Regular', 'Cargo'],
    distance: ['< 0.5 miles', '0.5-1 mile', '1-2 miles', '2+ miles'],
    battery: ['Any', '> 25%', '> 50%', '> 75%'],
    features: ['Basket', 'Child Seat', 'Lights', 'Lock']
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Bike className="w-4 h-4 mr-2" />
            Bike Type
          </h3>
          {filters.type.map((type) => (
            <label key={type} className="flex items-center space-x-2 mb-2">
              <input type="radio" name="type" className="text-teal-600" />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Distance
          </h3>
          {filters.distance.map((range) => (
            <label key={range} className="flex items-center space-x-2 mb-2">
              <input type="checkbox" className="rounded text-teal-600" />
              <span className="text-gray-700">{range}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Battery className="w-4 h-4 mr-2" />
            Battery Level
          </h3>
          {filters.battery.map((level) => (
            <label key={level} className="flex items-center space-x-2 mb-2">
              <input type="radio" name="battery" className="text-teal-600" />
              <span className="text-gray-700">{level}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Sliders className="w-4 h-4 mr-2" />
            Features
          </h3>
          {filters.features.map((feature) => (
            <label key={feature} className="flex items-center space-x-2 mb-2">
              <input type="checkbox" className="rounded text-teal-600" />
              <span className="text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}