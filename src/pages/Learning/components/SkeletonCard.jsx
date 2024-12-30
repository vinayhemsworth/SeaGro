import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
    >
      {/* Thumbnail skeleton */}
      <div className="w-full h-48 bg-gray-200" />
      
      <div className="p-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        
        {/* Metadata skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded mr-1" />
            <div className="h-4 bg-gray-200 rounded w-8" />
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded mr-1" />
            <div className="h-4 bg-gray-200 rounded w-12" />
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded mr-1" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </div>
    </motion.div>
  );
} 