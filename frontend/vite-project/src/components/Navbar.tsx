import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const user = authContext?.user; // handles when user is null
  const logout = authContext?.logout; // handles when logout is null
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-white shadow-md">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-pink-600 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => navigate("/")}>
          BookSer
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-600 hover:text-pink-600 transition-all duration-300 relative group">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/services" className="text-gray-600 hover:text-pink-600 transition-all duration-300 relative group">
            Services
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/about" className="text-gray-600 hover:text-pink-600 transition-all duration-300 relative group">
            About Us
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          {user && (
            <a href="/dashboard" className="text-gray-600 hover:text-pink-600 transition-all duration-300 relative group">
              Dashboard
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          )}
        </div>

        {/* User Profile / Login Button */}
        {user ? (
          <div className="relative">
            <img
              src={user.photoURL ?? "/assets/download.png"} // Replace with user profile image
              alt="User Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-transparent hover:border-pink-600 transition-all duration-300"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 transition-all duration-300 ease-in-out transform scale-100 opacity-100">
                <ul>
                  <li className="px-4 py-2 font-bold hover:bg-gray-100 cursor-pointer transition-all duration-300">
                    My Account
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-300">
                    My Booking
                  </li>
                  <li
                    className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer transition-all duration-300"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-pink-700"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {showDropdown ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {showDropdown && (
        <div className="md:hidden px-4 pt-2 pb-3 space-y-1 bg-white">
          <a href="/" className="block px-3 py-2 text-gray-600 hover:text-pink-600 hover:bg-gray-50">
            Home
          </a>
          <a href="/services" className="block px-3 py-2 text-gray-600 hover:text-pink-600 hover:bg-gray-50">
            Services
          </a>
          <a href="/about" className="block px-3 py-2 text-gray-600 hover:text-pink-600 hover:bg-gray-50">
            About Us
          </a>
          {user && (
            <a href="/dashboard" className="block px-3 py-2 text-gray-600 hover:text-pink-600 hover:bg-gray-50">
              Dashboard
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;