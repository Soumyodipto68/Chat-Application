import Users from "../models/user.models.js";
import Message from "../models/messages.models.js";
import { getReceiverSocketId } from "../lib/socket.js";

export const contactsforSidebar = async(req,res)=>{
  try {
    const loggedInUserId = req.user._id;
    const users = await Users.find({ _id: { $ne: loggedInUserId } }).select("-password");
    if(users){
    res.status(200).json(users);
    }
  }catch (error) {
    console.error("Error fetching contacts for sidebar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getMessages = async(req,res)=>{
    const receiverId = req.params.receiverId;
    const senderId = req.user._id;
  try{
     const messages = Message.find({
      $or:[
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId }
      ]
     })
     res.status(200).json(messages) 
  }catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Invalid request" });
  }
}

export const sendMessage = async(req,res)=>{
  try{
    const {text,image} = req.body;
    const senderId = req.user._id;
    const receiverId = req.params.receiverId;
    let imageUrl;
    if(image){
      const uploadResult = await cloudinary.uploader.upload(image)
      imageUrl = uploadResult.secure_url
    }
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      text,
      image: imageUrl
  })
  await newMessage.save();
  const receiverSocketId = getReceiverSocketId(receiverId);
  if(receiverSocketId){
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json(newMessage);
  }catch (error) {
    console.error("Error sending message controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}