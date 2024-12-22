import React from 'react';
import { CreatePost } from './components/CreatePost';
import { Post } from './components/Post';
import { Trending } from './components/Trending';

export function Community() {
  const posts = [
    {
      id: 1,
      author: {
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
      },
      content: 'Just completed an amazing project using React and Node.js! 🚀',
      media: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80',
      timestamp: '2 hours ago',
      likes: 24,
      comments: [
        {
          author: {
            name: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
          },
          content: 'Looks fantastic! Would love to learn more about the architecture.',
          timestamp: '1 hour ago'
        }
      ]
    },
    {
      id: 2,
      author: {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
      },
      content: 'Sharing my experience with AWS Lambda and Serverless Architecture',
      timestamp: '5 hours ago',
      likes: 15,
      comments: []
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <CreatePost />
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <Trending />
        </div>
      </div>
    </div>
  );
}