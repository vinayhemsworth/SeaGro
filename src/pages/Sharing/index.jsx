import React, { useState } from 'react';

export function Sharing() {
  // States for managing file upload and preview
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

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
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-white">Content Sharing</h1>
        <p className="mt-4 text-white">Share your images and videos with the community. Choose your file and hit the share button!</p>

        {/* File upload area */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-center items-center flex-col">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="mt-4 border-2 border-dashed border-gray-400 p-4 rounded-lg cursor-pointer"
            />
            {filePreview && (
              <div className="mt-4 w-full max-w-xs">
                <h3 className="font-semibold text-lg">Preview</h3>
                <div className="mt-2">
                  {file && file.type.startsWith('image') ? (
                    <img src={filePreview} alt="Preview" className="w-full h-auto rounded-lg shadow-md" />
                  ) : (
                    <video src={filePreview} controls className="w-full h-auto rounded-lg shadow-md" />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feedback Message */}
        {message && (
          <div className={`mt-4 p-3 rounded-md ${message.includes('success') ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {message}
          </div>
        )}

        {/* Share Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleShare}
            disabled={uploading}
            className={`px-6 py-3 bg-blue-600 text-white rounded-md shadow-md focus:outline-none ${uploading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {uploading ? 'Uploading...' : 'Share Content'}
          </button>
        </div>
      </div>
    </div>
  );
}
