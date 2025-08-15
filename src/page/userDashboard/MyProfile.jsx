
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import PostCard from "../../Components/PostCard/PostCard";
import Loading from "../Loading/Loading";


const MyProfile = () => {
    const { user, userInfo, refetch} = useAuth();
    const axiosSecure = useAxiosSecure()
    // const [recentPosts, setRecentPosts] = useState([]);




    // All post
    const { data: posts } = useQuery({
        queryKey: ['my-posts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?email=${user.email}`);
            return res.data
        }
    })
    // console.log(posts)

    


    const recentPosts = posts?.slice(-3).reverse();



    // HandleVote



    if (!user) return <p><Loading /></p>;

    return (
        <div className="max-w-3xl overflow-auto mx-auto md:h-[420px]  p-6 bg-white rounded shadow">
            <title>My Profile</title>
            <div className="flex border-b  border-gray-400 pb-10 items-center gap-6 mb-6">
                <img
                    src={user.photoURL || "/default-user.png"}
                    alt="User"
                    className="h-14 w-14 md:w-24 md:h-24 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-2xl font-bold">{user.displayName}</h2>
                    <p className="text-gray-600 text-xs md:text-lg">{user.email}</p>
                    <div className="flex gap-3 mt-2">
                        <div className="flex items-center gap-1 bg-[#D3D3D3] text-yellow-800 px-3 py-1 rounded-full font-semibold text-xs md:text-sm">
                            <span>🥉</span> Bronze
                        </div>

                        <div
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold md:text-sm ${userInfo?.isMember
                                ? "bg-yellow-500 text-white cursor-default"
                                : "bg-yellow-200 text-yellow-500 cursor-not-allowed opacity-50"
                                }`}
                            title={userInfo?.isMember ? "Gold Member" : "Become a Member to unlock"}
                        >
                            <span>🥇</span> Gold
                            {!userInfo?.isMember && (
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
                <div className="space-y-3  md:space-y-0 md:grid grid-cols-3 md:gap-2 md:h-28">
                    {recentPosts?.map((post) => (
                        <PostCard key={post._id} post={post} updatePosts={refetch} />

                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProfile;
