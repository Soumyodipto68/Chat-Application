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
    default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  }
},{timestamps: true})

export default mongoose.model("User", userSchema);