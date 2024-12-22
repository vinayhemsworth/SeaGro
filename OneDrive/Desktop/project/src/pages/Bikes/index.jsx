import React from 'react';
import { BikeMap } from './components/BikeMap';
import { BikeList } from './components/BikeList';
import { BikeFilters } from './components/BikeFilters';

export function Bikes() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BikeMap />
          <BikeList />
        </div>
        <div className="lg:col-span-1">
          <BikeFilters />
        </div>
      </div>
    </div>
  );
}