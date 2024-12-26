import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export function JobSearch({ setSearchQuery }) {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value); // Update the search query in parent
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Job title or keyword"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Location"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
