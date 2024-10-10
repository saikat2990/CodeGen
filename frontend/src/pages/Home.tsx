import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to CodeGen</h1>
      <p className="text-xl mb-8"></p>
      <Link
        to="/order"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Home;
