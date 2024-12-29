import React, { useEffect, useState } from 'react';
import { CreatePost } from './components/CreatePost';
import { Post } from './components/Post';
import { Trending } from './components/Trending';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

export function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          comments (*),
          likes (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <CreatePost onPostCreated={fetchPosts} />
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : (
            posts.map(post => (
              <Post 
                key={post.id} 
                post={post} 
                currentUser={user}
                onPostUpdated={fetchPosts}
              />
            ))
          )}
        </div>
        <div className="lg:col-span-1">
          <Trending />
        </div>
      </div>
    </div>
  );
}