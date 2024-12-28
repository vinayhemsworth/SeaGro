import React, { useState } from 'react';
import { Categories } from './components/Categories';
import { TrendingPosts } from './components/TrendingPosts';
import { PostForm } from './components/PostForm';

export function Sharing() {
  // States for managing file upload and preview
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Function to handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Validate file type (image or video)
      const fileType = selectedFile.type.split('/')[0];
      if (fileType !== 'image' && fileType !== 'video') {
        setMessage('Only images and videos are allowed!');
        setFile(null);
        setFilePreview(null);
        return;
      }
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile)); // Generate preview URL for the file
      setMessage('');
    }
  };

  // Function to simulate file upload
  const handleShare = () => {
    if (!file) {
      setMessage('Please select a file to share!');
      return;
    }

    setUploading(true);
    setMessage('Uploading your content...');
    
    // Simulate a file upload delay
    setTimeout(() => {
      setUploading(false);
      setMessage('Your content has been shared successfully!');
      setFile(null);
      setFilePreview(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar - Categories */}
        <div className="md:col-span-3">
          <Categories 
            selectedCategory={selectedCategory} 
            onCategorySelect={setSelectedCategory} 
          />
        </div>

        {/* Main Content */}
        <div className="md:col-span-6">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-white">Share Your Content</h1>
            <PostForm />
          </div>
        </div>

        {/* Right Sidebar - Trending */}
        <div className="md:col-span-3">
          <TrendingPosts />
        </div>
      </div>
    </div>
  );
}
