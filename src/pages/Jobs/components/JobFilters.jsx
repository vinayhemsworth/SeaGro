import React from 'react';
import { Briefcase, Clock, DollarSign, MapPin } from 'lucide-react';

export function JobFilters() {
  const filters = {
    jobType: ['Full-time', 'Part-time', 'Contract', 'Remote'],
    experience: ['Entry Level', 'Mid Level', 'Senior Level', 'Lead'],
    salary: ['$0-$50k', '$50k-$100k', '$100k-$150k', '$150k+'],
    location: ['Remote', 'On-site', 'Hybrid']
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            Job Type
          </h3>
          {filters.jobType.map((type) => (
            <label key={type} className="flex items-center space-x-2 mb-2">
              <input type="checkbox" className="rounded text-teal-600" />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Experience Level
          </h3>
          {filters.experience.map((level) => (
            <label key={level} className="flex items-center space-x-2 mb-2">
              <input type="checkbox" className="rounded text-teal-600" />
              <span className="text-gray-700">{level}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <DollarSign className="w-4 h-4 mr-2" />
            Salary Range
          </h3>
          {filters.salary.map((range) => (
            <label key={range} className="flex items-center space-x-2 mb-2">
              <input type="checkbox" className="rounded text-teal-600" />
              <span className="text-gray-700">{range}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Location Type
          </h3>
          {filters.location.map((type) => (
            <label key={type} className="flex items-center space-x-2 mb-2">
              <input type="checkbox" className="rounded text-teal-600" />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}