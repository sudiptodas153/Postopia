import React from 'react';
import { Link } from 'react-router';
import { FaLock } from 'react-icons/fa';

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md">
        <div className="text-red-500 text-6xl mb-4 flex justify-center">
          <FaLock />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page.
        </p>
        <Link to="/" className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
