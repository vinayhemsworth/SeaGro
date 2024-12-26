import React, { useState, useEffect } from 'react';
import { MapPin, Building2, DollarSign, Clock } from 'lucide-react';

export function JobList({ searchQuery, filters }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://remotive.com/api/remote-jobs');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        if (data.jobs && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else {
          throw new Error('Job data is missing or not in the expected format');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs
    .filter((job) => {
      const jobMatch =
        searchQuery.job && !job.title.toLowerCase().includes(searchQuery.job.toLowerCase())
          ? false
          : true;
      const locationMatch =
        searchQuery.location &&
        !job.candidate_required_location
          .toLowerCase()
          .includes(searchQuery.location.toLowerCase())
          ? false
          : true;

      const filterMatch =
        (filters.jobType.length
          ? filters.jobType.includes(job.job_type)
          : true) &&
        (filters.location.length
          ? filters.location.includes(job.candidate_required_location)
          : true) &&
        (filters.salary.length ? filters.salary.includes(job.salary) : true);

      return jobMatch && locationMatch && filterMatch;
    })
    .map((job) => (
      <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-4">
          <img
            src={job.company_logo || 'https://via.placeholder.com/100'}
            alt={job.company_name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <p className="text-gray-600 flex items-center mt-1">
                  <Building2 className="w-4 h-4 mr-1" />
                  {job.company_name}
                </p>
              </div>
              <button className="px-4 py-2 bg-teal-50 text-teal-700 rounded-xl hover:bg-teal-100 transition-colors">
                Apply Now
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {job.candidate_required_location || 'Remote'}
              </span>
              <span className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                {job.salary || 'Salary not listed'}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {job.published_at}
              </span>
            </div>
          </div>
        </div>
      </div>
    ));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      {filteredJobs.length === 0 ? (
        <div>No jobs available</div>
      ) : (
        filteredJobs
      )}
    </div>
  );
}
