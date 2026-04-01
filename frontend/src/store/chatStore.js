import {create} from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"

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
   sendMessage: async()=>{
      const {selectedUser,messages} = get();
      try{
        const res = await axiosInstance.post(`/messages/sendmessage/${selectedUser._id}`)
        set({ messages: [...messages, res.data] });
      }catch(error){
        toast.error("Failed to send message")
        console.error("Error sending message:", error);
      }
   }

}))