import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { authUserStore } from '../store/authStore'
import toast from 'react-hot-toast'


function LoginPage() {
  const {isLogginIn,login,authUser}=authUserStore()
  const [showPassword,setShowPassword]=useState(false)
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })

    const validateForm = () => {
    if (!formData.email && !formData.password) {
      toast.error("Please Enter Details");
      return false;
    }
    if (!formData.email) {
      toast.error("EmailId required");
      return false;
    }
    if (!formData.password) {
      toast.error("Password Required");
      return false;
    }
    console.log(formData);
    return true;
    };  


  const handleSubmit=(e) => {
    e.preventDefault();
    const success=validateForm();
    console.log("success=>",success);
    
    if(success===true){
      login(formData)
      console.log(authUser);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" 
        onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  // type="email"
                  autoComplete="email"
                  // required
                  className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  // required
                  className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLogginIn}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              // onClick={handleSubmit}
            >
              {isLogginIn ? "Signing in..." : "Sign in"}              
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              {/* <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} useOneTap /> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage