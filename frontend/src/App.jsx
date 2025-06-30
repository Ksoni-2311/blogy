// import { useState } from 'react'
import {Routes ,Route, Navigate} from "react-router-dom"
// import './App.css'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import HomePage from './pages/HomePage.jsx'
import Settings from './pages/Settings.jsx'
import Profile from './pages/Profile.jsx'
import Navbar from './pages/Navbar.jsx'
import Landing from "./pages/Landing.jsx"
import CreateBlog from "./pages/CreateBlog.jsx"
import { Toaster } from "react-hot-toast"
import { authUserStore } from "./store/authStore.js"
import BlogDetail from "./pages/BlogDetails.jsx"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner.jsx"

function App() {
  const {authUser,checkAuth,isCheckingAuth}=authUserStore()
  console.log(authUser);  

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth){
    <LoadingSpinner />
  }

  return (
    <>
    
    <div>
    <Navbar />
    <Routes>
      <Route path='/signup' element={!authUser?<SignUpPage />:<Navigate to="/" />}   />
      <Route path='/login' element={!authUser?<LoginPage />:<Navigate to="/" /> }   />
      <Route path='/' element={authUser ? <BlogDetail /> :<Navigate to="/login"/> }   />
      <Route path='/create' element={authUser?<CreateBlog />:<Navigate to="/login"/>}/>
      
      
      <Route path='/profile' element={authUser?<Profile />:<Navigate to="/login" />}   />
      <Route path='/dashboard' element={authUser ? <HomePage /> :<Navigate to="/login"/> }   />


      {/* 
      
      <Route path='/settings' element={<Settings />}   />
      
      <Route path='/' element={!authUser && <Landing />}   /> */}
    </Routes>
    <Toaster />
    </div>
    </>
  )
}

export default App
