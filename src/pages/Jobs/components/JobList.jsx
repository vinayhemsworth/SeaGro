import React from 'react';
import { MapPin, Building2, DollarSign, Clock } from 'lucide-react';

export function JobList() {
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $150k',
      logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&q=80&w=100&h=100',
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'StartupX',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100k - $130k',
      logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=100&h=100',
      posted: '1 week ago'
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$140k - $160k',
      logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=100&h=100',
      posted: '3 days ago'
    }
  ];

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start space-x-4">
            <img
              src={job.logo}
              alt={job.company}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 flex items-center mt-1">
                    <Building2 className="w-4 h-4 mr-1" />
                    {job.company}
                  </p>
                </div>
                <button className="px-4 py-2 bg-teal-50 text-teal-700 rounded-xl hover:bg-teal-100 transition-colors">
                  Apply Now
                </button>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {job.location}
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {job.salary}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {job.posted}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}