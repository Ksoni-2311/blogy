import { useState, useEffect } from "react"
import { User, Mail, Camera } from "lucide-react"
import { authUserStore } from "../store/authStore"

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
        bio: authUser.bio || "",
      })
    }
  }, [authUser])

  return (
    <div className="max-w-2xl mx-auto text-white mt-25">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-gray-400">View your personal information.</p>
      </div>

      <div className="bg-[#000000] rounded-lg shadow-md">
        <div className="p-6 space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={authUser.profilePic}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-gray-700"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-2 rounded-full transition-all duration-200 hidden"
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              readOnly
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-[#374151] cursor-not-allowed text-white"
              value={formData.name}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              readOnly
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-[#374151] cursor-not-allowed text-white"
              value={formData.email}
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              readOnly
              rows={4}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-[#374151] cursor-not-allowed text-white"
              value={formData.bio}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
