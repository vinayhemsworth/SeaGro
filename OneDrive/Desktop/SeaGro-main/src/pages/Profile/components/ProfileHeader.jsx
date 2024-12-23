import React from 'react';
import { MapPin, Users, Briefcase, Award } from 'lucide-react';

export function ProfileHeader({ user }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={user.coverImage}
          alt="Profile cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-8 pb-8">
        <div className="relative flex items-end -mt-16 mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg"
          />
          <div className="ml-6 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 flex items-center mt-1">
              <Briefcase className="w-4 h-4 mr-1" />
              {user.role}
            </p>
            <p className="text-gray-600 flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {user.location}
            </p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">{user.bio}</p>
      </div>
    </div>
  );
}