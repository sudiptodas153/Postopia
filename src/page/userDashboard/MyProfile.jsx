import { useState } from "react";

import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";


const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    // const [recentPosts, setRecentPosts] = useState([]);
    const [isMember, setIsMember] = useState(false);



    // All post
    const { data: posts, refetch } = useQuery({
        queryKey: ['my-posts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?email=${user.email}`);
            return res.data
        }
    })
    // console.log(posts)

    const recentPosts = posts?.slice(-3).reverse();




    // useEffect(() => {
    //     if (user?.email) {
    //         // Check membership status (backend থেকে আসবে)
    //         axios
    //             .get(`http://localhost:5000/api/users/${user.email}`)
    //             .then((res) => setIsMember(res.data?.isMember))
    //             .catch(() => setIsMember(false));

    //         // Get last 3 posts of the user
    //         axios
    //             .get(`http://localhost:5000/api/posts?email=${user.email}&limit=3`)
    //             .then((res) => setRecentPosts(res.data))
    //             .catch(() => setRecentPosts([]));
    //     }
    // }, [user]);

    // HandleVote
    const handleVote = async (postId, type) => {
        try {
            const res = await axiosSecure.patch(`/posts/vote/${postId}`, {
                email: user.email,
                type: type
            });
            if (res.data.success) {
                refetch();
            }
        } catch (error) {
            console.error(error);
        }
    };



    if (!user) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <div className="flex border-b border-gray-400 pb-10 items-center gap-6 mb-6">
                <img
                    src={user.photoURL || "/default-user.png"}
                    alt="User"
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-2xl font-bold">{user.displayName}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="flex gap-3 mt-2">
                        <div className="flex items-center gap-1 bg-[#D3D3D3] text-yellow-800 px-3 py-1 rounded-full font-semibold text-sm">
                            <span>🥉</span> Bronze
                        </div>

                        <div
                            className={`flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm ${isMember
                                ? "bg-yellow-500 text-white cursor-default"
                                : "bg-yellow-200 text-yellow-500 cursor-not-allowed opacity-50"
                                }`}
                            title={isMember ? "Gold Member" : "Become a Member to unlock"}
                        >
                            <span>🥇</span> Gold
                            {!isMember && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 15v2m0-8v2m4 4H8m12-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
            {recentPosts?.length === 0 ? (
                <p className="text-gray-500">No recent posts found.</p>
            ) : (
                <div className=" space-y-3 md:space-y-0 md:grid grid-cols-3 md:gap-2 md:h-28">
                    {recentPosts?.map((post) => {
                        const voted = post.votedUsers?.find(v => v.email === user.email);
                        const liked = voted?.type === "like";
                        const disliked = voted?.type === "dislike";

                        return (
                            <div
                                key={post._id}
                                className="border rounded p-3 hover:shadow cursor-pointer"
                            >
                                <h4 className="font-semibold md:text-xl text-lg">{post.title}</h4>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {post.description}
                                </p>
                                <div className="mt-4 flex items-center gap-4">
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => handleVote(post._id, "like")}
                                    >
                                        {
                                            liked ? <BiSolidLike size={25} /> : <AiOutlineLike size={25} />
                                        }
                                    </button>
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => handleVote(post._id, "dislike")}
                                    >
                                        {
                                            disliked ? <AiFillDislike size={25} /> :
                                                <AiOutlineDislike  size={25} />
                                        }

                                    </button>
                                    <button className="cursor-pointer">
                                        <FaRegCommentAlt size={20} />
                                    </button>
                                </div>

                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default MyProfile;
