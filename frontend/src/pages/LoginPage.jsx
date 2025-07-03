import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { authUserStore } from '../store/authStore'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

function LoginPage() {
  const { isLogginIn, login, authUser } = authUserStore()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const validateForm = () => {
    if (!formData.email && !formData.password) {
      toast.error("Please enter details")
      return false
    }
    if (!formData.email) {
      toast.error("Email is required")
      return false
    }
    if (!formData.password) {
      toast.error("Password is required")
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      login(formData)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black px-6 py-12">
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
          <h2 className="text-3xl font-bold text-green-400">Sign in to your account</h2>
          <p className="text-sm text-gray-300 mt-2">
            Or{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              create a new account
            </Link>
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full py-3 pl-10 pr-3 rounded-md bg-[#222] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full py-3 pl-10 pr-10 rounded-md bg-[#222] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLogginIn}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
            whileTap={{ scale: 0.96 }}
          >
            {isLogginIn ? "Signing in..." : "Sign in"}
          </motion.button>

          {/* Divider */}
          <motion.div
            className="relative mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">or continue with</span>
            </div>
          </motion.div>

          <div className="mt-6 flex justify-center">
            {/* Placeholder for Google Login */}
            {/* <GoogleLogin onSuccess={} onError={} /> */}
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default LoginPage
