import {create} from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"

export const chatStore = create((set)=>({
   users: [],
   getUsers:async()=>{
     try{
      const res = await axiosInstance.get("/messages/users")
      set({users: res.data})
      toast.success("Users fetched successfully")
     }catch (error) {
       toast.error("Failed to fetch users")
       console.error("Error fetching users 1:", error);
     }
   }
}))