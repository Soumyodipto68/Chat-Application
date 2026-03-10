import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username : {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
  profilePicture: {
    type: String,
    default: "https://res.cloudinary.com/dzj8qv6u7/image/upload/v1700864415/default-profile-picture_oxh9lq.png",
  }
},{timestamps: true})

export default mongoose.model("User", userSchema);