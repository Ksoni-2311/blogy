import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, User, Camera } from 'lucide-react'
import { Link, Navigate, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import avatar from '../assets/avatar.jpg'
import { authUserStore } from "../store/authStore"
import { motion } from "framer-motion"
import {auth,googleProvider} from '../lib/firebase.config.js'
import {  signInWithPopup } from 'firebase/auth'

function SignUpPage() {
   const navigate = useNavigate()
  const { signup } = authUserStore()
  const [showPassword, setShowPassword] = useState(true)
  const [selectedImg, setSelectedImage] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    profilePic: ""
  })
  const loginWithGoogle=async () => {
    try {
      const result=await signInWithPopup(auth,googleProvider)
      const user=result.user
      const name = user.displayName
      const email = user.email
      const photo = user.photoURL
      const id=await user.getIdToken()

      const newFormData={
        fullName:name,
        profilePic:photo,
        email:email,
        password:email+`${id}`
      }
      
      await signup(newFormData);
      toast.success("Account Created SuccessFully Please Login To Continue")
      navigate('/login')
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signup(formData)
      toast.success("Account created successfully!")
    } catch (err) {
      toast.error("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)

    setIsUploadingImage(true)

    reader.onload = () => {
      const base64Image = reader.result
      setSelectedImage(base64Image)
      setFormData(prev => ({ ...prev, profilePic: base64Image }))
      setIsUploadingImage(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black px-6 py-12 mt-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-black/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white"
      >
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-extrabold text-green-400 mb-2">Create your account</h2>
          <p className="text-sm text-gray-300">
            Or{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              sign in to your existing account
            </Link>
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <div className="p-[3px] bg-gradient-to-tr from-purple-500 via-indigo-400 to-cyan-400 rounded-full">
                <img
                  src={selectedImg || formData.profilePic || avatar}
                  alt="Profile"
                  className="size-28 rounded-full object-cover border-4 border-gray-900"
                />
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-2 bg-black bg-opacity-60 rounded-full cursor-pointer hover:bg-opacity-80 transition"
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                />
              </label>
            </div>
          </motion.div>

          {/* Full Name */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full py-3 pl-10 pr-3 rounded-md bg-[#222] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full py-3 pl-10 pr-3 rounded-md bg-[#222] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className="w-full py-3 pl-10 pr-10 rounded-md bg-[#222] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Creating account..." : "Create account"}
          </motion.button>

          {/* Divider */}
          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">or continue with</span>
            </div>
          </div> */}

          {/* Google Login Placeholder */}
          {/* <button
            onClick={loginWithGoogle}
            className="w-full flex justify-center items-center gap-2 bg-blue-950 text-black font-medium py-3 rounded-lg hover:bg-gray-200 transition"
          >
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </button> */}
        </form>
      </motion.div>
    </div>
  )
}

export default SignUpPage
