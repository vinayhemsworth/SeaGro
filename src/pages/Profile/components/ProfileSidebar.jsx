import React from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

export function ProfileSidebar({ user }) {
  const skills = ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'GraphQL'];
  
  const experiences = [
    {
      company: 'TechCorp',
      role: 'Senior Software Engineer',
      period: '2021 - Present'
    },
    {
      company: 'StartupX',
      role: 'Software Engineer',
      period: '2019 - 2021'
    }
  ];

  const education = [
    {
      school: 'Stanford University',
      degree: 'M.S. Computer Science',
      period: '2017 - 2019'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Experience
        </h3>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.company}>
              <h4 className="font-medium text-gray-900">{exp.role}</h4>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.period}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2" />
          Education
        </h3>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.school}>
              <h4 className="font-medium text-gray-900">{edu.degree}</h4>
              <p className="text-gray-600">{edu.school}</p>
              <p className="text-sm text-gray-500">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}