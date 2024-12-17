import React from 'react';
import { ChevronRight } from 'lucide-react';

export function LearningPath() {
  const paths = [
    {
      id: 1,
      title: 'Frontend Development',
      progress: 60,
      courses: 12,
      completed: 7
    },
    {
      id: 2,
      title: 'Cloud Architecture',
      progress: 30,
      courses: 8,
      completed: 2
    },
    {
      id: 3,
      title: 'DevOps Engineering',
      progress: 45,
      courses: 10,
      completed: 4
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {paths.map((path) => (
        <div
          key={path.id}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {path.title}
          </h3>
          
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-teal-500 h-2 rounded-full"
                style={{ width: `${path.progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{path.completed} / {path.courses} courses</span>
              <span>{path.progress}% complete</span>
            </div>
          </div>
          
          <button className="w-full flex items-center justify-center px-4 py-2 bg-teal-50 text-teal-700 rounded-xl hover:bg-teal-100 transition-colors">
            Continue Learning
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      ))}
    </div>
  );
}