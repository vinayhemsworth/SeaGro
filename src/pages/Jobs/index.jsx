import React, { useState } from 'react';
import { JobFilters } from './components/JobFilters';
import { JobList } from './components/JobList';
import { JobSearch } from './components/JobSearch';

export function Jobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    jobType: [],
    experience: [],
    salary: [],
    location: [],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-8">
        <JobSearch setSearchQuery={setSearchQuery} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <JobFilters setFilters={setFilters} />
          </div>
          <div className="lg:col-span-3">
            <JobList searchQuery={searchQuery} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
}
