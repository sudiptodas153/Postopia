import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BiSolidLike } from 'react-icons/bi';
import { AiOutlineLike, AiFillDislike, AiOutlineDislike } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';



const PostDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [refresh, setRefresh] = useState(false); // for refetching after comment or vote

  const shareUrl = `${window.location.origin}/post/${id}`;

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axiosSecure.get(`/posts/${id}`);
      setPost(res.data);
    };

    fetchPost();
  }, [id, axiosSecure, refresh]);

  const handleVote = async (type) => {
    if (!user) return alert("Please login to vote");

    try {
      const res = await axiosSecure.patch(`/posts/vote/${id}`, {
        email: user.email,
        type: type
      });

      if (res.data.updatedPost) {
        setPost(res.data.updatedPost);
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async () => {
    if (!user) return alert("Please login to comment");
    if (!newComment.trim()) return;

    try {
      const res = await axiosSecure.post(`/posts/comment/${id}`, {
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
        text: newComment
      });

      if (res.data.success) {
        setNewComment('');
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) return <p className="text-center py-10">Loading...</p>;

  const voted = post.votedUsers?.find(v => v.email === user?.email);
  const liked = voted?.type === 'like';
  const disliked = voted?.type === 'dislike';

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md border border-purple-300">
      {/* Post Header */}
      <div className="flex items-center gap-4 mb-4">
        <img src={post.authorImage || "/default-avatar.png"} alt="Author" className="w-12 h-12 rounded-full" />
        <div>
          <h2 className="font-semibold">{post.authorName}</h2>
          <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Post Content */}
      <h1 className="text-2xl font-bold text-purple-700">{post.title}</h1>
      <p className="text-gray-700 my-3">{post.description}</p>
      <p className="text-sm text-blue-500">#{post.tag}</p>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4 space-x-4">
        <button onClick={() => handleVote("like")} className="flex items-center gap-1">
          {liked ? <BiSolidLike size={24} /> : <AiOutlineLike size={24} />}
          {post.upVote || 0}
        </button>
        <button onClick={() => handleVote("dislike")} className="flex items-center gap-1">
          {disliked ? <AiFillDislike size={24} /> : <AiOutlineDislike size={24} />}
          {post.downVote || 0}
        </button>
        <div className="flex items-center gap-1">
          <FaRegCommentAlt size={20} /> {post.commentCount || 0}
        </div>
        <WhatsappShareButton url={shareUrl} title={post.title}>
          <WhatsappIcon size={28} round />
        </WhatsappShareButton>
      </div>

      {/* Comment Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>

        {user ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Write a comment..."
            />
            <button
              onClick={handleComment}
              className="self-end bg-purple-600 text-white px-4 py-1.5 rounded-lg hover:bg-purple-700"
            >
              Comment
            </button>
          </div>
        ) : (
          <p className="text-sm text-red-500">Please login to comment.</p>
        )}

        {/* Comment List */}
        <div className="mt-4 space-y-4">
          {post.comments?.length > 0 ? (
            post.comments.map((comment, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded-lg border">
                <div className="flex items-center gap-2 mb-1">
                  <img src={comment.image || "/default-avatar.png"} alt="User" className="w-8 h-8 rounded-full" />
                  <span className="font-medium">{comment.name}</span>
                </div>
                <p className="text-gray-700 text-sm">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
