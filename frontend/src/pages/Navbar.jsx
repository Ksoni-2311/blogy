import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Computer, Home, LogOut, Menu, Panda, PlusCircle, RectangleGoggles, Settings, User } from "lucide-react"
import { authUserStore } from '../store/authStore.js'
function Navbar() {
  const { authUser, logout } = authUserStore()
  console.log(authUser);
  
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg "
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/*left-logo CHATAR__PATTAR*/}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Panda size={36} color="#0681e0" strokeWidth={1.5} className=" text-primary animate-pulse " />
              </div>
              <h1 className=" text-2xl font-bold hidden sm:block ">Blogy</h1>
            </Link>
          </div>


          
          
          <div className="flex items-center gap-2">
            {authUser &&
          <>
            <Link to="/" className="btn btn-sm gap-2 transition-colorstext-white-700 hover:text-blue-600 transition-colors">
          <RectangleGoggles />
                <span className="hidden sm:inline">Explore</span>
              </Link>

          <Link to="/dashboard" className="btn btn-sm gap-2 transition-colorstext-white-700 hover:text-blue-600 transition-colors">
          <Computer />
                <span className="hidden sm:inline">DashBoard</span>
              </Link>

              <Link
                to="/create"
                className="btn btn-sm flex items-center space-x-1 text-white-700 hover:text-blue-600 transition-colors"
              >
                <PlusCircle size={18} />
                <span className="hidden sm:inline">Create</span>
              </Link>
              <Link to={"/profile"} className={`btn btn-sm gap-2  hover:text-blue-600 `}>
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              </>
          }
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors  hover:text-blue-600 
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser ? (
              <>

                <button className="flex gap-2 items-center  hover:text-blue-600 " onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ):<>
                  </>}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar