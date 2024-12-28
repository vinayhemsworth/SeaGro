import React, { useState } from 'react';
import { BikeMap } from './components/BikeMap';
import { BikeList } from './components/BikeList';
import { BikeFilters } from './components/BikeFilters';

export function Bikes() {
  // State to manage filters
  const [filters, setFilters] = useState({
    type: 'All Bikes',
    distance: [],
    battery: 'Any',
    features: []
  });

  // Handler to update filters
  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Map and Bike List */}
        <div className="lg:col-span-2">
          <BikeMap />
          <BikeList filters={filters} /> {/* Pass filters to BikeList */}
        </div>

        {/* Right Column: Filters */}
        <div className="lg:col-span-1">
          <BikeFilters onFilterChange={handleFilterChange} /> {/* Pass onFilterChange */}
        </div>
      </div>
    </div>
  );
}
