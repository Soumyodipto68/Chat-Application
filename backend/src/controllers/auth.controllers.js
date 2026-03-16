import { generateToken } from "../lib/token.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async(req, res) => {
  const { email, username, password } = req.body;
  try {
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if(password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    if(newUser) {
      generateToken(newUser._id, res);
      return res.status(201).json({ message: "User created successfully", user: newUser });
    }
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const login = async(req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    generateToken(user._id, res);
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const logout = (req, res) => {
    try{
    res.cookie('jwt', '', { maxAge: 0} )
    res.status(200).json({ message: "Logout successful" });
    }catch(error) { 
      console.error("Error in logout:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfile = async(req,res) =>{
  try{
    const {profilePic} = req.body
    const userId = req.user._id
    if(!profilePic) {
      return res.status(400).json({message:"Profile picture is required"})
    }
    const uploadImage = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadImage.secure_url }, { new: true })
    res.status(200).json({message:"Profile picture updated successfully", user: updatedUser})
  }catch(error){
    console.error("Error in updateProfile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

}