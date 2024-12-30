import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Users } from 'lucide-react';
import { CATEGORIES } from '../../../constants/categories';
import { CourseCard } from './CourseCard';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&maxResults=12`;

export function CourseGrid() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${YOUTUBE_API_URL}&q=${activeCategory.query}`);
        const data = await response.json();

        if (data.items) {
          // Add mock metadata to each video
          const videosWithMetadata = data.items.map(video => ({
            ...video,
            metadata: {
              rating: (4 + Math.random()).toFixed(1),
              duration: Math.floor(Math.random() * 180) + 30,
              level: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)]
            },
            category: activeCategory.title
          }));
          setVideos(videosWithMetadata);
        }
      } catch (err) {
        setError('Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [activeCategory]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  // If the data is still loading or an error occurred
  if (loading) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Category Selector */}
      <div className="flex flex-wrap gap-4 mb-6">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeCategory.id === category.id
                ? 'bg-teal-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <CourseCard
            key={video.id.videoId}
            video={video}
            onVideoClick={handleVideoClick}
          />
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-4 w-full max-w-4xl">
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
              title={selectedVideo.snippet.title}
              frameBorder="0"
              allowFullScreen
            />
            <button
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg"
              onClick={() => setSelectedVideo(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
