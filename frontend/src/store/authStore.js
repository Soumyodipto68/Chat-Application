import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
export const authStore = create((set)=>({
  loggedUser:null,
  signup: async(data)=>{
    try{
      const res = await axiosInstance.post("/auth/signup",data)
      set({loggedUser:res.data.user})
      toast.success("Signup successful")
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error signing up")
      set({loggedUser:null})
    }
  }
}))