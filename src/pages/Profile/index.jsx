import React from 'react';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileStats } from './components/ProfileStats';
import { ActivityFeed } from './components/ActivityFeed';
import { ProfileSidebar } from './components/ProfileSidebar';

export function Profile() {
  const user = {
    name: 'Sarah Wilson',
    role: 'Senior Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80',
    bio: 'Passionate about building scalable applications and mentoring junior developers.',
    location: 'San Francisco, CA',
    connections: 1234,
    projects: 45,
    certifications: 12
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <ProfileHeader user={user} />
          <ProfileStats user={user} />
          <ActivityFeed />
        </div>
        <div className="lg:col-span-1">
          <ProfileSidebar user={user} />
        </div>
      </div>
    </div>
  );
}