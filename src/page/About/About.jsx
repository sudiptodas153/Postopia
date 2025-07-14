// src/pages/About.jsx

import React from 'react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-[#ad4df1] mb-6">About Postopia</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-6 text-justify">
        <strong>Postopia</strong> is a modern online platform where users can engage in meaningful discussions,
        ask questions, share ideas, and build communities around shared interests. Built with the powerful
        MERN stack — MongoDB, Express.js, React.js, and Node.js — this forum emphasizes performance, responsiveness,
        and interactivity.
      </p>

      <h2 className="text-2xl font-semibold text-secondary mb-3">🚀 Key Features</h2>
      <ul className="list-disc pl-6 mb-6 text-gray-800">
        <li>User Authentication (Email & Social login)</li>
        <li>Post Creation, Voting, Commenting</li>
        <li>Role-based Dashboards (User & Admin)</li>
        <li>Membership with Stripe Payment Integration</li>
        <li>Comment Reporting System & Admin Moderation</li>
        <li>Real-time Search, Filtering, Sorting, and Pagination</li>
        <li>Fully Responsive Design (Mobile-first)</li>
      </ul>

      <h2 className="text-2xl font-semibold text-secondary mb-3">👨‍💻 Developer Info</h2>
      <p className="text-gray-700 mb-6">
        Hi, I’m <strong>Sudipto</strong>, a passionate junior MERN stack developer. I built this forum project as part of an assignment to demonstrate my ability to create a full-stack web application with modern features, best practices, and clean UI/UX.
      </p>

      <h2 className="text-2xl font-semibold text-secondary mb-3">📁 Technologies Used</h2>
      <div className="flex flex-wrap gap-3 text-white mb-6">
        <span className="bg-green-600 px-3 py-1 rounded-full">MongoDB</span>
        <span className="bg-gray-800 px-3 py-1 rounded-full">Express.js</span>
        <span className="bg-blue-600 px-3 py-1 rounded-full">React.js</span>
        <span className="bg-gray-700 px-3 py-1 rounded-full">Node.js</span>
        <span className="bg-cyan-500 px-3 py-1 rounded-full">Tailwind CSS</span>
        <span className="bg-orange-500 px-3 py-1 rounded-full">Firebase Auth</span>
        <span className="bg-indigo-500 px-3 py-1 rounded-full">Stripe</span>
        <span className="bg-red-500 px-3 py-1 rounded-full">React Hook Form</span>
        <span className="bg-teal-600 px-3 py-1 rounded-full">TanStack Query</span>
      </div>

      <p className="text-center mt-10 text-sm text-gray-500">© {new Date().getFullYear()} ForumSphere by Sudipto. All rights reserved.</p>
    </div>
  );
};

export default About;
