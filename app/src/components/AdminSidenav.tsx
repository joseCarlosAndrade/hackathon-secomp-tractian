
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminSidenav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Overlay for mobile when sidenav is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidenav}
        />
      )}

      {/* Sidenav */}
      <div
        className={`fixed top-0 left-0 h-full bg-white w-64 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 shadow-lg`}
      >
        <button
          className="absolute top-4 right-4 text-white bg-red-500"
          onClick={toggleSidenav}
        >
          X
        </button>
        <nav className="mt-32 space-y-4">
          <Link
            to="/admin"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
            onClick={toggleSidenav}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/tools"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
            onClick={toggleSidenav}
          >
            Tools
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
            onClick={toggleSidenav}
          >
            Log Out
          </Link>
        </nav>
      </div>

      {/* Menu Button */}
      {!isOpen && (
        <button
          className="fixed top-4 w-12 left-4 z-50 p-2 bg-blue-600 text-white shadow-lg focus:outline-none"
          onClick={toggleSidenav}
        >
          ☰
        </button>
      )}
    </div>
  );
};

export default AdminSidenav;
