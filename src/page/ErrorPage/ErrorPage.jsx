import React from 'react';
import { Link } from 'react-router';
import { BiErrorCircle } from 'react-icons/bi';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
      <BiErrorCircle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg mb-6 text-center">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2  text-white rounded-lg bg-gradient-to-r from-[#ad4df1] to-[#5191f7] transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
