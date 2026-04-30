import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { authStore } from "../store/authStore";

const ProfilePage = () => {
  const { loggedUser, updateProfile } = authStore();

  // ✅ for instant preview
  const [preview, setPreview] = useState(null);

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ show preview instantly
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // ✅ send file using FormData
    const formData = new FormData();
    formData.append("profilePicture", file);

    await updateProfile(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl p-10 border border-gray-700">
        <div className="relative z-10 flex flex-col items-center">
          {/* Profile Picture */}
          <div className="relative mb-6">
            <img
              src={
                preview ||
                `${loggedUser.profilePicture}?v=${loggedUser.updatedAt}`
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
            />

            <label
              htmlFor="profile-upload"
              className="absolute bottom-2 right-2 bg-gray-700 p-2 rounded-full shadow hover:bg-indigo-600 transition cursor-pointer"
              title="Change Profile Picture"
            >
              <FaCamera className="text-white text-lg" />
              <input
                id="profile-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfileUpload}
              />
            </label>
          </div>

          {/* Username */}
          <h2 className="text-2xl font-bold text-white mb-1">
            {loggedUser.username}
          </h2>

          {/* Email */}
          <p className="text-gray-400 mb-6">{loggedUser.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
