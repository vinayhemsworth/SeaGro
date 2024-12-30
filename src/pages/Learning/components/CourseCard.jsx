import React from 'react';
import { Star, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export function CourseCard({ video, onVideoClick }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={() => onVideoClick(video)}
    >
      <img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {video.snippet.title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {video.snippet.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{video.metadata.rating}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{video.metadata.duration} min</span>
          </div>
          
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{video.metadata.level}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 