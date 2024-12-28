import React from 'react';

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'tech', name: 'Technology' },
  { id: 'art', name: 'Art' },
  { id: 'food', name: 'Food' },
  { id: 'travel', name: 'Travel' },
  { id: 'music', name: 'Music' },
];

export function Categories({ selectedCategory, onCategorySelect }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="space-y-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
              selectedCategory === category.id
                ? 'bg-indigo-500 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
} 