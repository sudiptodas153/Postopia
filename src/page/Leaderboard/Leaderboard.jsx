// src/pages/Leaderboard.jsx

import React, { useEffect, useState } from 'react';
import { FaCrown, FaUserCircle } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { MdPostAdd } from 'react-icons/md';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          axiosSecure.get('/leaderboard/top-users'),
          axiosSecure.get('/leaderboard/top-posts')
        ]);
        setTopUsers(usersRes.data || []);
        setTopPosts(postsRes.data || []);
      } catch (err) {
        console.error('Leaderboard fetch failed', err);
      }
    };
    fetchLeaderboard();
  }, [axiosSecure]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">🏆 Forum Leaderboard</h1>

      {/* Top Users Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-secondary mb-4 flex items-center gap-2">
          <FaCrown className="text-yellow-500" /> Top Contributors
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {topUsers.length > 0 ? topUsers.map((user) => (
            <div key={user._id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
              <FaUserCircle className="text-4xl text-gray-500" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="flex items-center gap-1 text-blue-600 font-bold">
                <BiLike /> {user.totalVotes || 0}
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
        <div className="space-y-4">
          {topPosts.length > 0 ? topPosts.map((post) => (
            <div key={post._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-1">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-2">by {post.authorName}</p>
              <div className="flex gap-4 text-sm text-gray-700">
                <span>👍 Upvotes: {post.upVote}</span>
                <span>👎 Downvotes: {post.downVote}</span>
                <span>🔥 Net Votes: {post.upVote - post.downVote}</span>
              </div>
            </div>
          )) : <p>No popular posts yet.</p>}
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
