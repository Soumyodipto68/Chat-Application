import React from "react";
import { authStore } from "../store/authStore";
import { chatStore } from "../store/chatStore";
import { IoIosCloseCircleOutline } from "react-icons/io";


const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = chatStore();
  const { onlineUsers } = authStore();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-900 via-black to-gray-800 shadow-md border-b border-gray-700 w-full">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src={selectedUser.profilePicture}
          alt="User Avatar"
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-indigo-500 shadow-md object-cover"
        />
        <div>
          <h2 className="text-lg lg:text-xl text-white font-semibold truncate">
            {selectedUser.username}
          </h2>
          <p className="text-sm lg:text-base text-gray-400">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Close Button */}
      <button
        className="p-2 lg:p-3 rounded-full hover:bg-gray-700 transition"
        onClick={() => setSelectedUser(null)}
        title="Close Chat"
      >
        <span className="material-icons cursor-pointer text-lg lg:text-xl text-gray-300">
          <IoIosCloseCircleOutline />
        </span>
      </button>
    </div>
  );
};

export default ChatHeader;
