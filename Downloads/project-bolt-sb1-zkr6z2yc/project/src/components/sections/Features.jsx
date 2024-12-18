import React from 'react';
import { Briefcase, BookOpen, Users2, Bike, Newspaper, MessageSquare } from 'lucide-react';
import { Card } from '../ui/Card';

export function Features() {
  const features = [
    {
      icon: Briefcase,
      title: 'Smart Job Matching',
      description: 'AI-powered job recommendations tailored to your skills and career goals.'
    },
    {
      icon: BookOpen,
      title: 'Interactive Learning',
      description: 'Access world-class courses and hands-on workshops from industry experts.'
    },
    {
      icon: Users2,
      title: 'Vibrant Community',
      description: 'Connect with professionals, join groups, and participate in events.'
    },
    {
      icon: Bike,
      title: 'Green Commute',
      description: 'Sustainable bike-sharing program for eco-friendly urban mobility.'
    },
    {
      icon: Newspaper,
      title: 'Tech Insights',
      description: 'Stay updated with curated tech news and industry trends.'
    },
    {
      icon: MessageSquare,
      title: 'Real-time Collaboration',
      description: 'Seamless communication tools for teams and networking.'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover powerful tools and resources designed to accelerate your professional growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}