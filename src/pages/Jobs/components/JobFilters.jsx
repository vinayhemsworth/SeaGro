import React, { useState } from 'react';
import { Briefcase, Clock, DollarSign, MapPin } from 'lucide-react';

export function JobFilters({ setFilters }) {
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: [],
    experience: [],
    salary: [],
    location: [],
  });

  const handleFilterChange = (filterCategory, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[filterCategory].includes(value)) {
        updatedFilters[filterCategory] = updatedFilters[filterCategory].filter(
          (filter) => filter !== value
        );
      } else {
        updatedFilters[filterCategory].push(value);
      }
      setFilters(updatedFilters); // Pass filters to the parent
      return updatedFilters;
    });
  };

  const filters = {
    jobType: ['Full-time', 'Part-time', 'Contract', 'Remote'],
    experience: ['Entry Level', 'Mid Level', 'Senior Level', 'Lead'],
    salary: ['$0-$50k', '$50k-$100k', '$100k-$150k', '$150k+'],
    location: ['Remote', 'On-site', 'Hybrid'],
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
      <div className="space-y-6">
        {Object.keys(filters).map((filterCategory) => (
          <div key={filterCategory}>
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              {filterCategory === 'jobType' && <Briefcase className="w-4 h-4 mr-2" />}
              {filterCategory === 'experience' && <Clock className="w-4 h-4 mr-2" />}
              {filterCategory === 'salary' && <DollarSign className="w-4 h-4 mr-2" />}
              {filterCategory === 'location' && <MapPin className="w-4 h-4 mr-2" />}
              {filterCategory.replace(/([A-Z])/g, ' $1').toUpperCase()}
            </h3>
            {filters[filterCategory].map((option) => (
              <label key={option} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedFilters[filterCategory].includes(option)}
                  onChange={() => handleFilterChange(filterCategory, option)}
                  className="rounded text-teal-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
