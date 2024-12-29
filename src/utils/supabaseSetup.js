import { supabase } from './supabase';

export async function setupSupabase() {
  try {
    // Create bucket if it doesn't exist
    const { data: bucketExists } = await supabase
      .storage
      .getBucket('profile-images');

    if (!bucketExists) {
      const { error } = await supabase
        .storage
        .createBucket('profile-images', {
          public: true,
          fileSizeLimit: 2097152, // 2MB
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
          cacheControl: '3600',
        });

      if (error) {
        console.error('Error creating bucket:', error);
      }
    }

    // Set CORS policy for the bucket
    const { error: corsError } = await supabase
      .storage
      .updateBucket('profile-images', {
        corsRules: [{
          allowedOrigins: ['*'],
          allowedMethods: ['GET', 'PUT', 'POST', 'DELETE'],
          allowedHeaders: ['*'],
          maxAgeSeconds: 3600
        }]
      });

    if (corsError) {
      console.error('Error setting CORS policy:', corsError);
    }
  } catch (error) {
    console.error('Error setting up Supabase:', error);
  }
} 