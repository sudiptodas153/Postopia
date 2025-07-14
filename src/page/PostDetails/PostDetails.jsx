import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BiSolidLike } from 'react-icons/bi';
import { AiOutlineLike, AiFillDislike, AiOutlineDislike } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { RiDeleteBinLine } from "react-icons/ri";
import Loading from '../Loading/Loading';

const PostDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [refresh, setRefresh] = useState(false); // for refetching after comment or vote

    const shareUrl = `${window.location.origin}/post/${id}`;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axiosSecure.get(`/posts/${id}`);
                setPost(res.data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            }
        };




        fetchPost(); // initial fetch

        const interval = setInterval(fetchPost, 10000); // fetch every 10 seconds

        return () => clearInterval(interval); // cleanup
    }, [id, axiosSecure, refresh]);


    const fetchComments = async () => {
        try {
            const res = await axiosSecure.get(`/posts/comment/${id}`);
            setComments(res.data.comments);
        } catch (err) {
            console.error('Failed to load comments:', err);
        }
    };



    useEffect(() => {
        fetchComments();
    }, [id]);



    console.log(comments)

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
                await fetchComments(); // 🔁 new comments fetch
                setRefresh(!refresh); // post.commentCount update এর জন্য
            }
        } catch (error) {
            console.error(error);
        }
    };


    if (!post) return <p className="text-center py-10"><Loading></Loading></p>;

    const voted = post.votedUsers?.find(v => v.email === user?.email);
    const liked = voted?.type === 'like';
    const disliked = voted?.type === 'dislike';



    // Delete comment
    const handleDeleteComment = async (commentId) => {
        try {
            const res = await axiosSecure.delete(`/comments/${commentId}`);
            if (res.data.success) {

                setComments(prev => prev.filter(comment => comment._id !== commentId));


                const updatedPost = await axiosSecure.get(`/posts/${id}`);
                setPost(updatedPost.data);
            }
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }
    };



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
                    <FaRegCommentAlt size={20} /> {comments.length || 0}
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

                {/* Comment List (Facebook style) */}
                <div className="mt-4 space-y-4">
                    {comments.length > 0 ? (
                        comments.map((comment, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <img
                                    src={comment.image || "/default-avatar.png"}
                                    alt="User"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 max-w-lg relative">
                                    <div className="font-medium text-sm">{comment.name}</div>
                                    <div className="text-gray-700 text-sm">{comment.text}</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {new Date(comment.createdAt).toLocaleString()}
                                    </div>

                                    {/* Delete button (Only for comment owner) */}
                                    {user?.email === comment.email && (
                                        <button
                                            onClick={() => handleDeleteComment(comment._id)}
                                            className="absolute top-3 right-2 text-xs text-red-500 hover:underline"
                                        >
                                            <RiDeleteBinLine color='red' />
                                        </button>
                                    )}

                                </div>
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
