import { FaUserCircle } from "react-icons/fa";
import { chatStore } from "../store/chatStore";
import { useEffect } from "react";
import { authStore } from "../store/authStore";

const Sidebar = () => {
  const { users, getUsers, setSelectedUser } = chatStore();
  const { onlineUsers } = authStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <aside className="h-full w-20 lg:w-72 flex flex-col overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-800 border-r border-gray-700">
      
      {/* Header */}
      <div className="w-full p-5 bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-2xl text-indigo-400" />
          <span className="font-semibold text-lg hidden lg:block text-white">
            Contacts
          </span>
        </div>
      </div>

      {/* Contacts List (ONLY scrollable part) */}
      <div className="flex-1 overflow-y-auto w-full py-4 px-2">
        {users.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No contacts found.
          </div>
        )}

        {users.map((user) => (
         <button
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-gray-700/60 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
            >
          {/* Avatar */}
          <div className="relative flex-shrink-0">
        <img
          src={user.profilePicture}
          alt="profile"
          className="w-11 h-11 rounded-full object-cover border border-gray-600"
          />

          {onlineUsers.includes(user._id) && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
          )}
       </div>

  {/* Text */}
        <div className="hidden lg:flex flex-col items-start">
          <span className="text-sm font-medium text-white truncate">
          {user.username}
        </span>

    <span className="text-xs text-gray-400 mt-0.5">
      {onlineUsers.includes(user._id) ? "Online" : "Offline"}
    </span>
  </div>
</button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;