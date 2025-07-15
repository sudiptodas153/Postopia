import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Marquee from 'react-fast-marquee';

const AllTags = () => {
  const [tags, setTags] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axiosSecure.get('/tags');
        setTags(res.data);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };

    fetchTags();
  }, [axiosSecure]);

  return (
    <div className="p-6 bg-white rounded-xl shadow border border-purple-300">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Explore Tags</h2>

      {tags.length === 0 ? (
        <p className="text-center text-gray-500">No tags available.</p>
      ) : (
        <Marquee
          pauseOnHover={true}
          speed={50}
          gradient={false}
          className="space-x-4"
        >
          {tags.map(tag => (
            <button
              key={tag._id}
              className="px-4 py-2 bg-purple-100 text-xs mr-10 mt-5 hover:bg-purple-200 text-purple-700 font-semibold rounded-full border border-purple-300"
            >
              #{tag.name}
            </button>
          ))}
        </Marquee>
      )}
    </div>
  );
};

export default AllTags;
