import React from 'react';
import { Link } from 'react-router';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Welcome to HD App</h1>

      <div className="flex space-x-4">
        <Link to="/signin">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Sign In
          </button>
        </Link>

        <Link to="/signup">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
