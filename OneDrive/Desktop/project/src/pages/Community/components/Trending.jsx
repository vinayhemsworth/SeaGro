import React from 'react';
import { TrendingUp, Users } from 'lucide-react';

export function Trending() {
  const trends = [
    {
      tag: '#TechInnovation',
      posts: 1234,
      category: 'Technology'
    },
    {
      tag: '#RemoteWork',
      posts: 856,
      category: 'Work'
    },
    {
      tag: '#AIFuture',
      posts: 654,
      category: 'Technology'
    }
  ];

  const suggestions = [
    {
      name: 'Tech Enthusiasts',
      members: 1234,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80'
    },
    {
      name: 'Digital Nomads',
      members: 856,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="font-semibold text-lg flex items-center mb-4">
          <TrendingUp className="w-5 h-5 mr-2" />
          Trending Topics
        </h2>
        <div className="space-y-4">
          {trends.map((trend, index) => (
            <div key={index} className="space-y-1">
              <h3 className="font-medium text-teal-600">{trend.tag}</h3>
              <p className="text-sm text-gray-500">
                {trend.posts} posts · {trend.category}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="font-semibold text-lg flex items-center mb-4">
          <Users className="w-5 h-5 mr-2" />
          Suggested Groups
        </h2>
        <div className="space-y-4">
          {suggestions.map((group, index) => (
            <div key={index} className="flex items-center space-x-3">
              <img
                src={group.image}
                alt={group.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{group.name}</h3>
                <p className="text-sm text-gray-500">{group.members} members</p>
              </div>
              <button className="px-3 py-1 text-sm text-teal-600 border border-teal-600 rounded-full hover:bg-teal-50">
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}