import React, { useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import PostCard from '../../Components/PostCard/PostCard';
import Pagination from '../../Components/Pagination/Pagination';
import usePosts from '../../Hooks/usePosts';
import useAuth from '../../Hooks/useAuth';

const Home = () => {
    const [page, setPage] = useState(1);
    const [view, setView] = useState('newest'); // new state for view: newest, popular, comments
    const { loading2 } = useAuth();
    const { posts, totalPages } = usePosts(page, view);

    // Change view and reset page to 1
    const handleViewChange = (newView) => {
        setView(newView);
        setPage(1);
    };

    return (
        <div className="max-w-11/12 mx-auto mt-10 space-y-10">
            <Banner />

            {/* View Selection Buttons */}
            <div className="flex justify-center gap-4 mb-6">
                {['newest', 'popular'].map((v) => (
                    <button
                        key={v}
                        onClick={() => handleViewChange(v)}
                        className={`px-4 py-2 rounded-md font-semibold border transition
              ${view === v
                                ? ' text-white bg-gradient-to-r from-[#ad4df1] to-[#5191f7]'
                                : 'hover:text-white text-gray-800 hover:bg-gradient-to-r from-[#ad4df1b6] to-[#5191f752] border-gray-300 '}`}
                    >
                        {v === 'newest' && 'Newest'}
                        {v === 'popular' && 'Popularity'}
                    </button>
                ))}
            </div>

            {/* Posts */}
            <div className="space-y-5">
                {loading2 ? (
                    <div className="text-center text-lg">Loading posts...</div>
                ) : posts.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        {posts.map(post => <PostCard key={post._id} post={post} />)}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No posts found.</p>
                )}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default Home;
