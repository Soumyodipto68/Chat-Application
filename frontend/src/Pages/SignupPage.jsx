import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { authStore } from '../store/authStore'

const SignupPage = () => {
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const {signup} = authStore()

  const validateCredentials = ()=>{
   if(!userName.trim()) return toast.error("Username is required")
   if(!userEmail.trim()) return toast.error("Email is required")
   if(!userPassword.trim()) return toast.error("Password is required")
   if(userPassword.length<6) return toast.error("Password must be at least 6 characters")
   if(!/\S+@\S+\.\S+/.test(userEmail)) return toast.error("Invalid email format")
    return true;
  } 
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(validateCredentials()) return signup({username:userName,email:userEmail,password:userPassword})
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded-2xl shadow-2xl p-8 w-full max-w-md bg-slate-400 relative overflow-hidden">
        {/* <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-400 opacity-20 rounded-full z-0 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-400 opacity-20 rounded-full z-0 animate-pulse"></div> */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center text-black mb-6 drop-shadow-lg">
            Sign Up
          </h2>
          <form  onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-900 mb-1" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-3 bg-gray-200 border-black text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your username"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-gray-900 mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 bg-gray-200 border-black text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your email"
                value={userEmail}
                onChange={(e)=>setUserEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-gray-900 mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 bg-gray-200 border-black text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your password"
                value={userPassword}
                onChange={(e)=>setUserPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-violet-800 transition transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-400 opacity-30"></div>
            <span className="mx-2 text-gray-800 text-xs">or</span>
            <div className="flex-grow h-px bg-gray-400 opacity-30"></div>
          </div>
          <p className="mt-6 text-center text-gray-900">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-800 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>

  )
}

export default SignupPage