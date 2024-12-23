import React from 'react';

export function Card({ title, description, icon: Icon, className = '' }) {
  return (
    <div className={`group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      {Icon && (
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-teal-50 to-blue-50 w-fit">
          <Icon className="w-6 h-6 text-teal-600" />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}