import React from 'react';
import { Users, FolderGit2, Award } from 'lucide-react';

export function ProfileStats({ user }) {
  const stats = [
    { icon: Users, label: 'Connections', value: user.connections },
    { icon: FolderGit2, label: 'Projects', value: user.projects },
    { icon: Award, label: 'Certifications', value: user.certifications }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 my-8">
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            <Icon className="w-8 h-8 text-teal-500" />
          </div>
        </div>
      ))}
    </div>
  );
}