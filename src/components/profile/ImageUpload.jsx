import React, { useRef } from 'react';
import { Camera } from 'lucide-react';

export function ImageUpload({ currentImage, onImageChange, type = 'avatar' }) {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group">
      <img
        src={currentImage}
        alt={type === 'avatar' ? 'Profile' : 'Cover'}
        className={`
          ${type === 'avatar' ? 'w-32 h-32 rounded-2xl' : 'w-full h-48 object-cover'}
          transition-opacity group-hover:opacity-75
        `}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className={`
          absolute inset-0 flex items-center justify-center
          bg-black bg-opacity-50 opacity-0 group-hover:opacity-100
          transition-opacity cursor-pointer
          ${type === 'avatar' ? 'rounded-2xl' : ''}
        `}
      >
        <Camera className="w-8 h-8 text-white" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}