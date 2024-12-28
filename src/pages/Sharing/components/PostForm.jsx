import React, { useState, useRef } from 'react';
import { uploadFile } from '../../../services/uploadService';

export function PostForm() {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');
  
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Validate file type
      const fileType = selectedFile.type.split('/')[0];
      if (fileType !== 'image') {
        setMessage('Only images are allowed!');
        setFile(null);
        setFilePreview(null);
        return;
      }

      // Validate file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (selectedFile.size > maxSize) {
        setMessage('File size must be less than 5MB!');
        setFile(null);
        setFilePreview(null);
        return;
      }

      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
      setMessage('');
    }
  };

  const handleShare = async () => {
    if (!file) {
      setMessage('Please select a file to share!');
      return;
    }

    if (!caption) {
      setMessage('Please add a caption to your post!');
      return;
    }

    if (!category) {
      setMessage('Please select a category!');
      return;
    }

    setUploading(true);
    setMessage('Uploading your content...');

    try {
      const fileUrl = await uploadFile(file, (progress) => {
        setUploadProgress(progress);
      });

      // Here you would typically save the post details to your backend
      const postData = {
        caption,
        category,
        fileUrl,
        timestamp: new Date().toISOString(),
      };

      // Reset form
      setMessage('Your content has been shared successfully!');
      setFile(null);
      setFilePreview(null);
      setCaption('');
      setCategory('');
      setUploadProgress(0);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setMessage('Error uploading content: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />
      
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      >
        <option value="">Select a category</option>
        <option value="tech">Technology</option>
        <option value="art">Art</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="music">Music</option>
      </select>

      <div className="mb-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-indigo-50 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100"
        >
          Choose Image
        </label>
        {filePreview && (
          <div className="mt-4">
            <img
              src={filePreview}
              alt="Preview"
              className="max-w-full h-auto max-h-64 rounded-lg"
            />
          </div>
        )}
      </div>

      {uploading && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Uploading: {uploadProgress}%
          </p>
        </div>
      )}

      {message && (
        <div className={`mb-4 p-2 rounded ${
          message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}

      <button
        onClick={handleShare}
        disabled={uploading}
        className={`w-full py-2 px-4 rounded-md text-white ${
          uploading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {uploading ? 'Uploading...' : 'Share Post'}
      </button>
    </div>
  );
} 