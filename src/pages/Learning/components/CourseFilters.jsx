import { BarChart2, Clock, Tag, Book } from 'lucide-react';
import { CATEGORIES } from '../../../constants/categories';

export function CourseFilters({ filters = {}, onFilterChange = () => {} }) {
  const filterOptions = {
    level: ['Beginner', 'Intermediate', 'Advanced'],
    duration: ['0-60', '60-120', '120-180', '180-240'],
    topics: CATEGORIES.map(cat => cat.title)
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
      <div className="space-y-6">
        {Object.entries(filterOptions).map(([type, options]) => (
          <div key={type}>
            <h3 className="text-sm font-medium text-gray-900 mb-3 capitalize">
              {type}
            </h3>
            {options.map((option) => (
              <label key={option} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  className="text-teal-600"
                  checked={filters[type]?.includes(option)}
                  onChange={() => onFilterChange(type, option)}
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
