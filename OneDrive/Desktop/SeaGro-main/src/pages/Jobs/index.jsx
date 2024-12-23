import React from 'react';
import { JobFilters } from './components/JobFilters';
import { JobList } from './components/JobList';
import { JobSearch } from './components/JobSearch';

export function Jobs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-8">
        <JobSearch />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <JobFilters />
          </div>
          <div className="lg:col-span-3">
            <JobList />
          </div>
        </div>
      </div>
    </div>
  );
}