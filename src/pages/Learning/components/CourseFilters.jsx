import React from 'react';
import { Clock, BarChart2, Tag, Book } from 'lucide-react';

export function CourseFilters() {
  const filters = {
    level: ['Beginner', 'Intermediate', 'Advanced'],
    duration: ['0-2 hours', '2-5 hours', '5-10 hours', '10+ hours'],
    topics: ['Web Development', 'Cloud Computing', 'DevOps', 'Mobile Development'],
    type: ['Video Courses', 'Interactive', 'Projects', 'Certifications']
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <BarChart2 className="w-4 h-4 mr-2" />
            Level
          </h3>
          {filters.level.map((level) => (
            <label key={level} className="flex items-center space-x-2 mb-2">
              <input type="checkbox" className="rounded text-teal-600" />
              <span className="text-gray-700">{level}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Duration
          </h3>
          {filters.duration.map((time) => (
            <label key={time} className="flex items-center space-x-2 mb-2">
              <input type="checkbox" className="rounded text-teal-600" />
              <span className="text-gray-700">{time}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Tag className="w-4 h-4 mr-2" />
            Topics
          </h3>
          {filters.topics.map((topic) => (
            <label key={topic} className="flex items-center space-x-2 mb-2">
              <input type="checkbox" className="rounded text-teal-600" />
              <span className="text-gray-700">{topic}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Book className="w-4 h-4 mr-2" />
            Content Type
          </h3>
          {filters.type.map((type) => (
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