import React, { useState } from 'react';
import './Banner.css';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Banner = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
 const axiosSecure = useAxiosSecure()
    const handleSearch = async (e) => {
        e.preventDefault(); // form submit prevent
        if (!searchTerm) return;

        try {
            const res = await axiosSecure.get(`/posts/search?tag=${searchTerm}`);
            setResults(res.data);
            console.log(res)
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    return (
        <div className="w-full">
            {/* Banner Section */}
            <div className="md:h-[500px] h-52 flex rounded-lg items-center justify-center custom">
                <form onSubmit={handleSearch} className="join md:w-6/12">
                    <input
                        type="text"
                        className="border rounded-l-2xl border-white text-white px-4 py-1 text-sm focus:outline-none join-item w-full"
                        placeholder="Search by tag..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="btn border-none text-white rounded-r-2xl bg-gradient-to-r from-[#ad4df1] to-[#5191f7] join-item"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Search Results Section */}
            <div className="mt-8 ">
                {results.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {results.map((post) => (
                            <div key={post._id} className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold mb-1">{post.title}</h2>
                                <p className="text-gray-600 text-sm mb-2">Tag: {post.tag}</p>
                                <p className="text-sm text-gray-800">Tag: {post.content}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500"> No posts found</p>
                )}
            </div>
        </div>
    );
};

export default Banner;
