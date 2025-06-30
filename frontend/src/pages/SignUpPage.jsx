import { useState } from "react"
import { GoogleLogin } from "@react-oauth/google"
import { Eye, EyeOff, Lock, Mail, User, Camera } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import avatar from '../assets/avatar.jpg'
import { authUserStore } from "../store/authStore"

function SignUpPage() {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Send `formData` to backend here
      signup(formData)
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

    reader.onload = async () => {
      const base64Image = reader.result
      setSelectedImage(base64Image)
      setFormData(prev => ({ ...prev, profilePic: base64Image }))
      setIsUploadingImage(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center font-extrabold text-4xl text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <img
                    src={selectedImg || formData.profilePic || avatar}
                    alt="Profile"
                    className="size-32 rounded-full object-cover border-4"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute bottom-0 right-0 
                      bg-base-content hover:scale-105
                      p-2 rounded-full cursor-pointer 
                      transition-all duration-200
                      ${isUploadingImage ? "animate-pulse pointer-events-none" : ""}
                    `}
                  >
                    <Camera className="w-5 h-5 text-base-200" />
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
                <p className="text-sm text-zinc-400">
                  "Click the camera icon to update your photo"
                </p>
              </div>

              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

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
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create account"}
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

export default SignUpPage
