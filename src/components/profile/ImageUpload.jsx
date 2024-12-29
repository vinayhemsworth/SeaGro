import React, { useRef } from 'react';
import { Camera } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { toast } from 'react-hot-toast';

export function ImageUpload({ currentImage, onImageChange, type = 'avatar' }) {
  const fileInputRef = useRef(null);

  const uploadToSupabase = async (file) => {
    try {
      // Set folder based on type
      const folder = type === 'avatar' ? 'avatars' : 'covers';
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${fileExt}`;

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error uploading image');
      return null;
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Show loading toast
      const loadingToast = toast.loading('Uploading image...');

      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase
      const publicUrl = await uploadToSupabase(file);
      
      if (publicUrl) {
        onImageChange(publicUrl);
        toast.success('Image uploaded successfully', {
          id: loadingToast
        });
      } else {
        toast.error('Failed to upload image', {
          id: loadingToast
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error uploading image');
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