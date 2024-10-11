import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to PSS UI Tool</h1>
      <p className="text-xl mb-8">Your one-stop solution for UI design</p>
      <Link to="/canvas" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Go to Canvas
      </Link>
    </div>
  );
};

export default Home;
