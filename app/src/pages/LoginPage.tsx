import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-screen">
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={() => navigate('/admin')}
          className="bg-blue-100 text-blue-800 px-6 py-3 rounded-full shadow-sm hover:bg-blue-200 focus:outline-none transition-all"
        >
          Login como Supervisor
        </button>
        <button
          onClick={() => navigate('/user')}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-sm hover:bg-blue-700 focus:outline-none transition-all"
        >
          Login como Manutentor
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
