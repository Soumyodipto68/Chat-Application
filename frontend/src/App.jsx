import React from 'react'
import Navbar from './Components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage'
import {Toaster} from 'react-hot-toast'
import { authStore } from './store/authStore'
const App = () => {
  const { loggedUser } = authStore();
  return (
    <div className='min-h-screen bg-slate-700'>
      <Navbar />
      <Routes>
        <Route path='/' element={loggedUser ? <HomePage/>:<Navigate to="/login" />} />
        <Route path='/signup' element={!loggedUser ? <SignupPage/> : <Navigate to="/" />} />
        <Route path='/login' element={!loggedUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path='/profile' element={loggedUser?<ProfilePage/>:<Navigate to="/login" />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App