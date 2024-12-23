import React, { useState } from 'react';
import { Image, Video, Link as LinkIcon, Send } from 'lucide-react';

export function CreatePost() {
  const [content, setContent] = useState('');
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex space-x-3">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
          alt="User avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border-none focus:ring-0 resize-none"
            rows="3"
          />
          {mediaPreview && (
            <div className="relative mt-2">
              <img src={mediaPreview} alt="Preview" className="rounded-lg max-h-64 w-auto" />
              <button
                onClick={() => setMediaPreview(null)}
                className="absolute top-2 right-2 p-1 bg-gray-800/50 rounded-full text-white"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t">
        <div className="flex space-x-2">
          <label className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <Image className="w-5 h-5 text-blue-500" />
            <input type="file" accept="image/*" className="hidden" onChange={handleMediaUpload} />
          </label>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Video className="w-5 h-5 text-green-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <LinkIcon className="w-5 h-5 text-purple-500" />
          </button>
        </div>
        <button
          className="px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 flex items-center"
        >
          <Send className="w-4 h-4 mr-2" />
          Post
        </button>
      </div>
    </div>
  );
}