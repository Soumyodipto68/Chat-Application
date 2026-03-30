import { FaCamera } from "react-icons/fa";
import { authStore } from "../store/authStore";

const ProfilePage = () => {
  const { loggedUser, updateProfile } = authStore();

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      await updateProfile({ profilePicture: reader.result });
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-500 rounded-2xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden">
        {/* <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-400 opacity-20 rounded-full z-0 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-400 opacity-20 rounded-full z-0 animate-pulse"></div> */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-6">
            <img
              src={loggedUser.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-900 shadow-lg object-cover"
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-2 right-2 bg-gray-900 p-2 rounded-full shadow hover:bg-blue-100 transition cursor-pointer"
              title="Change Profile Picture"
            >
              <FaCamera className="text-blue-500 text-lg" />
              <input
                id="profile-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfileUpload}
              />
            </label>
          </div>
          <h2 className="text-2xl font-bold text-slate-950 mb-1">
            {loggedUser.username}
          </h2>
          <p className="text-gray-900 mb-6">{loggedUser.email}</p>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;