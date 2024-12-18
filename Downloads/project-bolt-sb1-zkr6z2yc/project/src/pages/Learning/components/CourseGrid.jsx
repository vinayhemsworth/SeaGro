import React from 'react';
import { Star, Clock, Users } from 'lucide-react';

export function CourseGrid() {
  const courses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'Sarah Wilson',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80',
      rating: 4.8,
      students: 1234,
      duration: '6 hours',
      level: 'Advanced'
    },
    {
      id: 2,
      title: 'Node.js Microservices',
      instructor: 'John Doe',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80',
      rating: 4.7,
      students: 987,
      duration: '8 hours',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'AWS Solutions Architecture',
      instructor: 'Mike Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
      rating: 4.9,
      students: 2345,
      duration: '12 hours',
      level: 'Advanced'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="aspect-video relative">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg text-sm font-medium">
              {course.level}
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {course.title}
            </h3>
            <p className="text-gray-600 mb-4">{course.instructor}</p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1">{course.rating}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                {course.students}
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {course.duration}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}