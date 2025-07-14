import React, { useEffect, useState } from 'react';
import { FaCrown, FaUserCircle } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { MdPostAdd } from 'react-icons/md';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Loading from '../Loading/Loading';

const Leaderboard = () => {
    const [topUsers, setTopUsers] = useState([]);
    const [topPosts, setTopPosts] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { loading } = useAuth();  // তোমার auth এর loading

    // নিজের local loading state (optional, যদি তোমার useAuth.loading না চলে)
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                setFetching(true);  // ডেটা ফেচ শুরু
                const [usersRes, postsRes] = await Promise.all([
                    axiosSecure.get('/leaderboard/top-users'),
                    axiosSecure.get('/leaderboard/top-posts')
                ]);
                setTopUsers(usersRes.data || []);
                setTopPosts(postsRes.data || []);
            } catch (err) {
                console.error('Leaderboard fetch failed', err);
            } finally {
                setFetching(false);  // ফেচ শেষ
            }
        };
        fetchLeaderboard();
    }, [axiosSecure]);

    if (loading || fetching) {
        // Loading এর সময় spinner বা loading টেক্সট দেখাবে
        return (
          <Loading></Loading>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-10">🏆 Forum Leaderboard</h1>

            {/* Top Users Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-secondary mb-4 flex items-center gap-2">
                    <FaCrown className="text-yellow-500" /> Top Contributors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topUsers.length > 0 ? topUsers.map((user) => (
                        <div
                            key={user._id}
                            className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4"
                        >
                            <FaUserCircle className="text-5xl text-gray-500 flex-shrink-0" />
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-lg font-semibold">{user.name}</h3>
                                <p className="text-sm text-gray-600 break-all">{user.email}</p>
                            </div>
                            <div className="flex items-center gap-1 text-blue-600 font-bold text-lg mt-2 sm:mt-0">
                                <BiLike size={24} /> {user.totalVotes || 0}
                            </div>
                        </div>
                    )) : <p>No top users yet.</p>}
                </div>
            </section>

            {/* Top Posts Section */}
            <section>
                <h2 className="text-2xl font-semibold text-secondary mb-4 flex items-center gap-2">
                    <MdPostAdd className="text-green-500" /> Most Popular Posts
                </h2>
                <div className="gap-5 grid md:grid-cols-3">
                    {topPosts.length > 0 ? topPosts.map((post) => (
                        <div
                            key={post._id}
                            className="bg-white p-4 rounded-lg shadow-md"
                        >
                            <div className='flex items-center justify-between'>
                                <h3 className="text-lg font-bold mb-1 break-words">{post.title}</h3>
                                <h3 className=" font-bold mb-1 text-blue-600">#{post.tag}</h3>
                            </div>
                            <p className="text-sm flex justify-end text-gray-600 font-extrabold mb-2 break-words">By {post.authorName}</p>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                                <span>👍 Upvotes: {post.upVote || 0}</span>
                                <span>👎 Downvotes: {post.downVote || 0}</span>
                                <span>🔥 Net Votes: {(post.upVote || 0) - (post.downVote || 0)}</span>
                            </div>
                        </div>
                    )) : <p>No popular posts yet.</p>}
                </div>
            </section>
        </div>
    );
};

export default Leaderboard;
