import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { CreatePost } from './components/CreatePost';
import { Post } from './components/Post';

export function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          likes (
            user_id
          ),
          comments (
            id,
            content,
            user_id,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPosts();

    // Set up real-time subscription
    const subscription = supabase
      .channel('public:posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <CreatePost onPostCreated={fetchPosts} />
      <div className="mt-8 space-y-6">
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          </div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post.id} post={post} onPostUpdated={fetchPosts} />
          ))
        ) : (
          <p className="text-center text-gray-500">No posts yet. Be the first to post!</p>
        )}
      </div>
    </div>
  );
}