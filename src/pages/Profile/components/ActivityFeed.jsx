import React from 'react';
import { Award, Briefcase, BookOpen, MessageSquare } from 'lucide-react';

export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: 'achievement',
      icon: Award,
      title: 'Earned AWS Certification',
      description: 'Completed AWS Solutions Architect certification',
      time: '2 days ago'
    },
    {
      id: 2,
      type: 'job',
      icon: Briefcase,
      title: 'Started new position',
      description: 'Senior Software Engineer at TechCorp',
      time: '1 week ago'
    },
    {
      id: 3,
      type: 'course',
      icon: BookOpen,
      title: 'Completed Course',
      description: 'Advanced React Patterns and Best Practices',
      time: '2 weeks ago'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className="p-2 bg-teal-50 rounded-xl">
              <activity.icon className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{activity.title}</h3>
              <p className="text-gray-600">{activity.description}</p>
              <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}