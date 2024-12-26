import React, { useState, useEffect } from 'react';
import { JobSearch } from './components/JobSearch';
import { JobList } from './components/JobList';
import { JobFilters } from './components/JobFilters';

export function Jobs() {
  const [searchQuery, setSearchQuery] = useState({ job: '', location: '' });
  const [filters, setFilters] = useState({
    jobType: [],
    salary: [],
    location: [],
  });

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch('https://remotive.com/api/remote-jobs');
      const data = await response.json();
      setJobs(data.jobs);
    };
    fetchJobs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <JobSearch setSearchQuery={setSearchQuery} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <JobFilters jobs={jobs} setFilters={setFilters} />
        </div>
        <div className="md:col-span-3">
          <JobList searchQuery={searchQuery} filters={filters} />
        </div>
      </div>
    </div>
  );
}
