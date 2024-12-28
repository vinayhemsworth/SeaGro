import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';

export function EditableField({ value, onSave, label, multiline = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleSave = () => {
    onSave(editedValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedValue(value);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="group relative">
        {multiline ? (
          <div className="text-gray-700 leading-relaxed">{value}</div>
        ) : (
          <div className="text-xl font-semibold text-gray-900">{value}</div>
        )}
        <button
          onClick={() => setIsEditing(true)}
          className="absolute -right-8 top-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit2 className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
          rows={4}
        />
      ) : (
        <input
          type="text"
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
        />
      )}
      <div className="flex space-x-2">
        <button
          onClick={handleSave}
          className="flex items-center px-3 py-1 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <Check className="w-4 h-4 mr-1" />
          Save
        </button>
        <button
          onClick={handleCancel}
          className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <X className="w-4 h-4 mr-1" />
          Cancel
        </button>
      </div>
    </div>
  );
}