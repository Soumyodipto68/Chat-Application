import {create} from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"
import { authStore } from "./authStore"

export const chatStore = create((set,get)=>({
   users: [],
   messages: [],
   selectedUser: null,
   getUsers:async()=>{
     try{
      const res = await axiosInstance.get("/messages/users")
      set({users: res.data})
      toast.success("Users fetched successfully")
     }catch (error) {
       toast.error("Failed to fetch users")
       console.error("Error fetching users 1:", error);
     }
   },
   setSelectedUser:(user)=>{
      set({selectedUser: user})
   },

   getMessages: async()=>{
      const {selectedUser} = get();
      try{
         const res = await axiosInstance.get(`/messages/getmessages/${selectedUser._id}`)
         set({messages: res.data})
      }catch(error){
         toast.error("Failed to fetch messages")
         console.error("Error fetching messages:", error);
      }
   },
   sendMessage: async(data)=>{
      const {selectedUser,messages} = get();
      try{
        const formData = new FormData();
        formData.append("text", data.text);
        if (data.imageFile) {
          formData.append("image", data.imageFile);
        }
        
        const res = await axiosInstance.post(`/messages/sendmessage/${selectedUser._id}`, formData)
        set({ messages: [...messages, res.data] });
      }catch(error){
        toast.error("Failed to send message")
        console.error("Error sending message:", error);
      }
   },
  listenForNewMessage: () => {
    const socket = authStore.getState().socket;
    socket.off("newMessage"); // Remove any existing listeners to avoid duplicates
    socket.on("newMessage", (newMessage) => {
      const { selectedUser } = get();
      const { loggedUser } = authStore.getState();
      
      // Only add message if it's for the current selected chat
      if (selectedUser && loggedUser) {
        const isRelevantMessage = 
          (String(newMessage.senderId) === String(selectedUser._id) && String(newMessage.receiverId) === String(loggedUser._id)) ||
          (String(newMessage.receiverId) === String(selectedUser._id) && String(newMessage.senderId) === String(loggedUser._id));
        
        if (isRelevantMessage) {
          set({ messages: [...get().messages, newMessage] });
        }
      }
    });
  },

  stopListeningForMessages:()=>{
    const socket = authStore.getState().socket;
    socket.off("newMessage")
  }

}))