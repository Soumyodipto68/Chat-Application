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
        const res = await axiosInstance.post(`/messages/sendmessage/${selectedUser._id}`, data)
        set({ messages: [...messages, res.data] });
      }catch(error){
        toast.error("Failed to send message")
        console.error("Error sending message:", error);
      }
   },
   listenForNewMessage:()=>{
      const socket = authStore.get().socket;
      socket.on("newMessage",(message)=>{
         const {messages} = get();
         set({messages: [...messages, message]})
      })
   },

   stopListeningforMessages:()=>{
      const socket = authStore.get().socket;
      socket.off("newMessage")
   }

}))