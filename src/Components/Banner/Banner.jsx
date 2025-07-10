import React from 'react';
import './Banner.css'

const Banner = () => {
    return (
        <div className="md:h-[500px] h-52 flex rounded-lg items-center justify-center custom">
            <div className="join md:w-6/12">
                <input
                    type="text"
                    className="border rounded-l-2xl border-white text-white px-4 py-1 text-sm focus:outline-none join-item w-full"
                    placeholder="Search by tag..."
                    required
                />
                <button className="btn border-none text-white rounded-r-2xl bg-gradient-to-r from-[#ad4df1] to-[#5191f7] join-item">Search</button>
            </div>

        </div>
    );
};

export default Banner;