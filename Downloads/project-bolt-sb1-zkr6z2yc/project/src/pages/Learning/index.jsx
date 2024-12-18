import React from 'react';
import { CourseGrid } from './components/CourseGrid';
import { LearningPath } from './components/LearningPath';
import { CourseFilters } from './components/CourseFilters';

export function Learning() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <CourseFilters />
        </div>
        <div className="lg:col-span-3 space-y-8">
          <LearningPath />
          <CourseGrid />
        </div>
      </div>
    </div>
  );
}