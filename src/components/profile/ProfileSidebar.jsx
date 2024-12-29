import React, { useState } from 'react';
import { Briefcase, GraduationCap, Plus, X } from 'lucide-react';

export function ProfileSidebar({ user, onUpdateSkills, onUpdateExperience, onUpdateEducation }) {
  const [newSkill, setNewSkill] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...(user.skills || []), newSkill.trim()];
      onUpdateSkills(updatedSkills);
      setNewSkill('');
      setIsAddingSkill(false);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = (user.skills || []).filter(skill => skill !== skillToRemove);
    onUpdateSkills(updatedSkills);
  };

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {(user.skills || []).map((skill) => (
            <div
              key={skill}
              className="group flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm"
            >
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        
        {isAddingSkill ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 p-2 border rounded-lg text-sm"
              placeholder="Enter skill"
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            />
            <button
              onClick={handleAddSkill}
              className="p-2 text-teal-600 hover:text-teal-700"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsAddingSkill(false)}
              className="p-2 text-gray-500 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingSkill(true)}
            className="flex items-center text-sm text-teal-600 hover:text-teal-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Skill
          </button>
        )}
      </div>

      {/* Experience Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Experience
        </h3>
        {/* Add experience editing functionality here */}
      </div>

      {/* Education Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2" />
          Education
        </h3>
        {/* Add education editing functionality here */}
      </div>
    </div>
  );
}