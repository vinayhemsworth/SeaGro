import React, { useState } from 'react';
import { Battery, MapPin, Bike, Sliders } from 'lucide-react';

export function BikeFilters({ onFilterChange }) {
  const filters = {
    type: ['All Bikes', 'Electric', 'Regular', 'Cargo'],
    distance: ['< 0.5 miles', '0.5-1 mile', '1-2 miles', '2+ miles'],
    battery: ['Any', '> 25%', '> 50%', '> 75%'],
    features: ['Basket', 'Child Seat', 'Lights', 'Lock']
  };

  const [selectedFilters, setSelectedFilters] = useState({
    type: 'All Bikes',
    distance: null,
    battery: null,
    features: []
  });

  const handleFilterChange = (field, value) => {
    const updatedFilters = {
      ...selectedFilters,
      [field]: field === 'features'
        ? selectedFilters.features.includes(value)
          ? selectedFilters.features.filter(f => f !== value)
          : [...selectedFilters.features, value]
        : value
    };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
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
              <input 
                type="radio" 
                name="type" 
                className="text-teal-600" 
                checked={selectedFilters.type === type}
                onChange={() => handleFilterChange('type', type)} 
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
        {/* Add other filter sections similar to "Bike Type" */}
      </div>
    </div>
  );
}
