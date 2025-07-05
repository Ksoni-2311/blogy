import { useState, useEffect } from "react"
import { User, Mail, Camera } from "lucide-react"
import { authUserStore } from "../store/authStore"
import { motion } from "framer-motion"

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  })

  const { authUser } = authUserStore()

  useEffect(() => {
    if (authUser) {
      setFormData({
        name: authUser.fullName || "",
        email: authUser.email || "",
        bloggerSince: authUser.createdAt || "",
      })
    }
  }, [authUser])

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-black py-20 px-4 text-white flex justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-2xl bg-gray-900/80 rounded-2xl shadow-xl p-8 backdrop-blur"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-green-400">Your Profile</h1>
          <p className="text-gray-300">View your personal information</p>
        </motion.div>

        {/* Profile Picture */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative">
            <div className="p-[5px] rounded-full bg-gradient-to-tr from-purple-500 via-indigo-400 to-cyan-400">
              <img
                src={authUser.profilePic}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-gray-900"
              />
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-80 cursor-pointer transition"
            >
              <Camera className="w-5 h-5 text-white" />
              <input type="file" id="avatar-upload" className="hidden" />
            </label>
          </div>
        </motion.div>

        {/* Info Fields */}
        <div className="space-y-6">
          {/* Full Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              readOnly
              value={formData.name}
              className="w-full bg-[#2c2c3a] text-white rounded-lg px-4 py-2 border border-indigo-500 cursor-not-allowed"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-sm text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              readOnly
              value={formData.email}
              className="w-full bg-[#2c2c3a] text-white rounded-lg px-4 py-2 border border-indigo-500 cursor-not-allowed"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span className="block text-sm text-gray-300 mb-1">Member Since</span>
            <input
              type="email"
              readOnly
              value={formData.bloggerSince?.split("T")[0]}

              className="w-full bg-[#2c2c3a] text-white rounded-lg px-4 py-2 border border-indigo-500 cursor-not-allowed"
            />
          </motion.div>

          {/* Bio */}
          {/* <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label className="block text-sm text-gray-300 mb-1">Bio</label>
            <textarea
              readOnly
              value={formData.bloggerSince?.split("T")[0]}
              rows={4}
              className="w-full bg-[#2c2c3a] text-white rounded-lg px-4 py-2 border border-indigo-500 cursor-not-allowed"
            />
          </motion.div> */}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Profile
