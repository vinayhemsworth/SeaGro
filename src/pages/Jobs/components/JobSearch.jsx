import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export function JobSearch({ setSearchQuery }) {
  const [jobQuery, setJobQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const handleJobSearchChange = (e) => {
    setJobQuery(e.target.value);
    setSearchQuery({ job: e.target.value, location: locationQuery });
  };

  const handleLocationSearchChange = (e) => {
    setLocationQuery(e.target.value);
    setSearchQuery({ job: jobQuery, location: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={jobQuery}
            onChange={handleJobSearchChange}
            placeholder="Job title or keyword"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={locationQuery}
            onChange={handleLocationSearchChange}
            placeholder="Location"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
