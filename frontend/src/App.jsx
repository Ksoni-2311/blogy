// import { useState } from 'react'
import {Routes ,Route, Navigate} from "react-router-dom"
// import './App.css'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import HomePage from './pages/HomePage.jsx'
import Settings from './pages/Settings.jsx'
import Profile from './pages/Profile.jsx'
import Navbar from './pages/Navbar.jsx'

function App() {
  const authUser=true;
  return (
    <>
    <Navbar />
    
    <div>
    <Routes>
      <Route path='/' element={authUser ? <HomePage /> :<Navigate to="/login"/> }   />
      <Route path='/login' element={<LoginPage />}   />
      <Route path='/signup' element={<SignUpPage />}   />
      <Route path='/settings' element={<Settings />}   />
      <Route path='/profile' element={authUser?<Profile />:<Navigate to="/login" />}   />
    </Routes>
        
    </div>
    </>
  )
}

export default App
