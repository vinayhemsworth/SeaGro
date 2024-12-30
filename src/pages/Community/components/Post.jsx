import React, { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { supabase } from '../../../utils/supabase';
import { useAuth } from '../../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-hot-toast';

export function Post({ post, onPostUpdated }) {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const { user } = useAuth();
  
  const isLiked = post.likes?.some(like => like.user_id === user?._id);

  const handleLike = async () => {
    if (!user) {
      toast.error('Please login to like posts');
      return;
    }

    try {
      if (isLiked) {
        await supabase
          .from('likes')
          .delete()
          .match({ 
            post_id: post.id, 
            user_id: user._id 
          });
      } else {
        await supabase
          .from('likes')
          .insert([{ 
            post_id: post.id, 
            user_id: user._id 
          }]);
      }
      onPostUpdated();
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;

    try {
      await supabase
        .from('comments')
        .insert([{
          post_id: post.id,
          user_id: user._id,
          content: comment
        }]);

      setComment('');
      onPostUpdated();
      toast.success('Comment added');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-start space-x-3">
        <div className="flex-1">
          <p className="font-medium">User</p>
          <p className="text-gray-500 text-sm">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </p>
          <p className="mt-2">{post.content}</p>
          {post.media_url && (
            <img
              src={`${supabase.storageUrl}/object/public/post-media/${post.media_url}`}
              alt="Post media"
              className="mt-2 rounded-lg max-h-96 w-auto"
            />
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${isLiked ? 'text-teal-500' : 'text-gray-500'}`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{post.likes?.length || 0}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 text-gray-500"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments?.length || 0}</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 space-y-4">
          {post.comments?.map(comment => (
            <div key={comment.id} className="flex space-x-2">
              <div className="flex-1 bg-gray-50 rounded-lg p-3">
                <p className="font-medium">User</p>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
          <form onSubmit={handleComment} className="flex space-x-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-lg border p-2"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-lg"
            >
              Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
}