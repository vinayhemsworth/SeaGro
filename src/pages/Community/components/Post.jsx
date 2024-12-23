import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

export function Post({ post }) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{post.author.name}</h3>
              <p className="text-sm text-gray-500">{post.timestamp}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <p className="mt-3">{post.content}</p>
        
        {post.media && (
          <img
            src={post.media}
            alt="Post content"
            className="mt-3 rounded-lg w-full"
          />
        )}
        
        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center space-x-2 ${liked ? 'text-red-500' : 'text-gray-500'}`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            <span>{post.likes + (liked ? 1 : 0)}</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-500"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments.length}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-gray-500">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
      
      {showComments && (
        <div className="border-t p-4 space-y-4">
          {post.comments.map((comment, index) => (
            <div key={index} className="flex space-x-3">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-xl p-3">
                  <h4 className="font-semibold">{comment.author.name}</h4>
                  <p>{comment.content}</p>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                  <button>Like</button>
                  <button>Reply</button>
                  <span>{comment.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex space-x-3 mt-4">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
              alt="Your avatar"
              className="w-8 h-8 rounded-full"
            />
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 bg-gray-50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}