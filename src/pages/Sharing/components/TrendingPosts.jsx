import React from 'react';

export function TrendingPosts() {
  const trendingPosts = [
    { id: 1, title: 'Amazing Sunset', author: 'John Doe', likes: 1234 },
    { id: 2, title: 'Tech Review', author: 'Jane Smith', likes: 987 },
    { id: 3, title: 'Cooking Tips', author: 'Chef Mike', likes: 756 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Trending Now</h2>
      <div className="space-y-4">
        {trendingPosts.map((post) => (
          <div key={post.id} className="border-b pb-2">
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-sm text-gray-500">by {post.author}</p>
            <div className="flex items-center text-sm text-gray-400">
              <span>❤️ {post.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 