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
      toast.error("Failed to sign up")
      set({loggedUser:null})
    }
  },
  login : async(data)=>{
    try{
      const res = await axiosInstance.post("/auth/login",data)
      set({loggedUser:res.data.user})
      toast.success("Login successful")
    }catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to login")
      set({loggedUser:null})
    }
  },
  logout: async()=>{
    try{
      await axiosInstance.get("/auth/logout")
      toast.success("Logout successful")
      set({loggedUser:null})
    } catch (error) {
      console.error("Error in logging out:", error);
      toast.error("Failed to logout")
    }
  },
  updateProfile: async(data)=>{
    try{
    const res= await axiosInstance.put("/auth/update-profile",data)
    set({loggedUser:res.data})
    toast.success("Profile Picture  updated successfully")
    }catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Failed to update profile picture")
    }
   
  }

}))