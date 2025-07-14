import React from 'react';
import logo from '../../assets/logo.png';

const Loading = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-white">
            <div className="relative w-20 h-20">
                {/* Spinning border */}
                <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>

                {/* Centered logo */}
                <img
                    src={logo}
                    alt="Loading"
                    className="w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
            </div>
        </div>
    );
};

export default Loading;
