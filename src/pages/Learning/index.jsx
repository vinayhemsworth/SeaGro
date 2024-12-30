import { useState } from 'react';
import { CourseGrid } from './components/CourseGrid';
import { CourseFilters } from './components/CourseFilters';
import { CATEGORIES } from '../../constants/categories';

export function Learning() {
  const [filters, setFilters] = useState({
    level: [],
    duration: [],
    topics: []
  });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <CourseFilters 
            filters={filters} 
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="lg:col-span-3 space-y-8">
          <CourseGrid filters={filters} />
        </div>
      </div>
    </div>
  );
}
