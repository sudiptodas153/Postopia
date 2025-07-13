// src/components/PostCard.jsx
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaThumbsDown, FaComments, FaRegCommentAlt } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { BiSolidLike } from 'react-icons/bi';

const PostCard = ({ post, updatePost }) => {
    // console.log(post)
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()


    const handleVote = async (postId, type) => {
        try {
            const res = await axiosSecure.patch(`/posts/vote/${postId}`, {
                email: user.email,
                type: type
            });

            if (res.data.updatedPost) {
                updatePost(res.data.updatedPost);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const voted = post.votedUsers?.find(v => v.email === user?.email);
    const liked = voted?.type === "like";
    const disliked = voted?.type === "dislike";


    return (
        <div className=''>
            <div className=" rounded-2xl border border-[#ad4df1ad] w-full shadow-sm p-4 space-y-2">
                <div className="flex items-center gap-3">
                    <img src={post.authorImage || "/default-avatar.png"} alt="Author" className="w-10 h-10 rounded-full" />
                    <div>
                        <h2 className="font-semibold">{post.authorName}</h2>
                        <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-primary">{post.title}</h3>
                <p className="text-sm text-gray-600">#{post.tag}</p>

                <div className="flex justify-between items-center pt-2 text-sm">
                    <button
                        className="cursor-pointer"
                        onClick={() => handleVote(post._id, "like")}
                    >
                        {
                            liked ? <div className='flex items-center gap-1'><BiSolidLike size={25} /> {post.upVote || 0}</div> : <div className='flex items-center gap-1'><AiOutlineLike size={25} /> {post.upVote || 0}</div>
                        }
                    </button>
                    <button
                        className="cursor-pointer"
                        onClick={() => handleVote(post._id, "dislike")}
                    >
                        {
                            disliked ? <div className='flex items-center gap-1'><AiFillDislike size={25} /> {post.downVote || 0}</div> :
                                <div className='flex items-center gap-1'><AiOutlineDislike size={25} /> {post.downVote || 0}</div>
                        }

                    </button>
                    <button className="cursor-pointer flex items-center gap-1">
                        <FaRegCommentAlt size={20} /> {post.commentCount || 0}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default PostCard;
