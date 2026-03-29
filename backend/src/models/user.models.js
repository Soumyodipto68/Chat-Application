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
    default: "https://i.pinimg.com/736x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
  }
},{timestamps: true})

export default mongoose.model("User", userSchema);