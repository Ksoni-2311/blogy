import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Eye, PlusCircle, Trash2, Edit } from 'lucide-react'
import { motion } from 'framer-motion'
import { blogsStore } from '../store/blogStore'
import { authUserStore } from '../store/authStore'
import MDEditor from '@uiw/react-md-editor'
import { formatDate } from '../lib/utils'


function HomePage() {
  const { myBlogs, getUserAllBlogs, count } = blogsStore()
  const { authUser } = authUserStore()
  const hasFetchedRef = useRef(false)

  useEffect(() => {
    if (!hasFetchedRef.current) {
      getUserAllBlogs()
      hasFetchedRef.current = true
    }
  }, [])

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white py-16 px-6 mt-4">
    <div className="max-w-6xl mx-auto">

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent mb-2 drop-shadow-md">
          Welcome back, {authUser?.fullName}!
        </h1>
        <p className="text-gray-200 text-lg">
          Manage your blogs and share your thoughts with the world.
        </p>
      </motion.div>

      {/* Stats + CTA */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        {/* Views Card */}
        <motion.div
       initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl text-center hover:shadow-blue-500/40 transition-shadow w-full md:w-1/2 flex justify-center items-center p-6"
      >
      <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-400 drop-shadow-lg whitespace-nowrap">
        Total Number of Blog: {count}
      </span>
  </motion.div>


        {/* Create Blog CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <Link
            to="/create"
            className="inline-flex items-center gap-3 bg-blue-700 hover:bg-blue-800 px-8 py-4 text-white text-xl font-semibold rounded-xl shadow-lg transition-all duration-300"
          >
            <PlusCircle size={28} />
            <span>Create New Blog</span>
          </Link>
        </motion.div>
      </div>

      {/* Blog List */}
      <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700 bg-gray-900 rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">Your Blogs</h2>
        </div>

        {myBlogs.length === 0 ? (
          <div className="p-12 text-center text-gray-300">
            <p className="text-lg mb-4">You haven't created any blogs yet.</p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white text-lg font-medium rounded-lg transition"
            >
              <PlusCircle size={20} />
              <span>Create Your First Blog</span>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {myBlogs.map((blog, index) => (
              <motion.div
                key={blog?._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-gray-700 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold text-yellow-300 mb-2">{blog?.title}</h3>
                    <p className="text-gray-300 mb-3 line-clamp-2">{blog?.content?.substring(0, 150)}...</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{formatDate(blog?.createdAt)}</span>
                      </div>
                      {blog?.views && (
                        <div className="flex items-center gap-1">
                          <Eye size={16} />
                          <span>{blog?.views} views</span>
                        </div>
                      )}
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          blog?.published
                            ? 'bg-green-200 text-green-800'
                            : 'bg-yellow-200 text-yellow-800'
                        }`}
                      >
                        {blog?.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <Link to={`/viewBlog/${blog?._id}`} className="text-blue-400 hover:text-blue-300 font-medium">
                      View
                    </Link>
                    <Link
                      to={`/editBlog/${blog?._id}`}
                      className="inline-flex items-center gap-1 text-white hover:text-yellow-300"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </Link>
                    {/* Optional Delete */}
                    {/* <button className="inline-flex items-center gap-1 text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
)
}

export default HomePage
