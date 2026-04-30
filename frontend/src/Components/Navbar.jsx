import React from "react";
import { Link } from "react-router-dom";
import { BiMessageEdit } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import { authStore } from "../store/authStore";

const Navbar = () => {
  const { logout, loggedUser } = authStore();

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-800 px-5 py-3 flex items-center justify-between shadow-lg border-b border-gray-700">
      {/* Logo / Title */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center text-white hover:text-indigo-400 transition"
          title="Messages"
        >
          <BiMessageEdit className="text-4xl text-indigo-400 bg-gray-800 p-2 rounded-lg shadow-md" />
          <span className="ml-3 text-2xl font-bold tracking-wide select-none">
            Chatter Box
          </span>
        </Link>
      </div>

      {/* Right Side */}
      {loggedUser && (
        <div className="flex items-center gap-6">
          {/* Profile Link */}
          <Link
            to="/profile"
            className="flex items-center text-gray-300 hover:text-indigo-400 transition"
            title="Profile"
          >
            <img
              src={loggedUser.profilePicture}
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-indigo-500 shadow-md object-cover"
            />
            <span className="ml-2 text-sm">Profile</span>
          </Link>

          {/* Logout Button */}
          <button
            className="flex items-center text-gray-300 hover:text-red-400 transition"
            title="Logout"
            onClick={logout}
          >
            <IoIosLogOut className="text-lg" />
            <span className="ml-2 text-sm">Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
