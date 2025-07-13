import React, { useState } from 'react';
import './Banner.css';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AiFillDislike } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { BiSolidLike } from 'react-icons/bi';


const Banner = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const axiosSecure = useAxiosSecure();
   

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchTerm) {
            setHasSearched(false);
            setResults([]);
            return;
        }

        try {
            const res = await axiosSecure.get(`/posts/search?tag=${searchTerm}`);
            setResults(res.data);
            setHasSearched(true);
        } catch (error) {
            console.error('Search failed:', error);
            setHasSearched(true);
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
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            if (e.target.value === '') {
                                setResults([]);
                                setHasSearched(false);
                            }
                        }}
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
            <div className="mt-8">
                {hasSearched && (
                    results.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {results.map((post) => (
                                <div key={post._id} className=" rounded-2xl border border-[#ad4df1ad] w-full shadow-sm p-4 space-y-2">
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
                                        >
                                            {
                                               <div className='flex items-center gap-1'><BiSolidLike size={25} /> {post.upVote || 0}</div> 
                                            }
                                        </button>
                                        <button
                                            className="cursor-pointer"
                                        >
                                            {
                                               <div className='flex items-center gap-1'><AiFillDislike size={25} /> {post.downVote || 0}</div> 
                                            }

                                        </button>
                                        <button className="cursor-pointer flex items-center gap-1">
                                            <FaRegCommentAlt size={20} /> {post.commentCount || 0}
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No posts found</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Banner;
