import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Eye, PlusCircle, Trash2, Edit } from 'lucide-react'
import { motion } from 'framer-motion'
import { blogsStore } from '../store/blogStore'
import { authUserStore } from '../store/authStore'


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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-extrabold text-yellow-400 mb-2">Welcome back, {authUser?.fullName}!</h1>
          <p className="text-gray-200 text-lg">Manage your blogs and create new content.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: 'Total Blogs',
              value: count,
              color: 'text-blue-400',
              delay: 0.1,
            },
            {
              label: 'Total Views',
              value: myBlogs.reduce((total, blog) => total + (blog.views || 0), 0),
              color: 'text-green-400',
              delay: 0.2,
            },
            {
              label: 'Published',
              value: myBlogs.filter((blog) => blog.published).length,
              color: 'text-purple-400',
              delay: 0.3,
            },
          ].map(({ label, value, color, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay, duration: 0.6 }}
              className="bg-gray-800 rounded-xl shadow-lg p-6 text-center"
            >
              <h3 className="text-lg font-semibold text-gray-300 mb-1">{label}</h3>
              <p className={`text-4xl font-bold ${color}`}>{value}</p>
            </motion.div>
          ))}
        </div>

        {/* Create New Blog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-medium rounded-lg transition"
          >
            <PlusCircle size={20} />
            <span>Create New Blog</span>
          </Link>
        </motion.div>

        {/* Blog List */}
        <div className="bg-gray-800 rounded-xl shadow-lg">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Your Blogs</h2>
          </div>

          {myBlogs.length === 0 ? (
            <div className="p-12 text-center text-gray-300">
              <p className="text-lg mb-4">You haven't created any blogs yet.</p>
              <Link
                to="/create"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-md transition"
              >
                <PlusCircle size={18} />
                <span>Create Your First Blog</span>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {myBlogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1 mb-4 md:mb-0">
                      <h3 className="text-lg font-semibold text-yellow-300 mb-2">{blog.title}</h3>
                      <p className="text-gray-300 mb-3 line-clamp-2">{blog.content?.substring(0, 150)}...</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          {/* <span>{formatDate(blog.createdAt)}</span> */}
                        </div>
                        {blog.views && (
                          <div className="flex items-center space-x-1">
                            <Eye size={16} />
                            <span>{blog.views} views</span>
                          </div>
                        )}
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            blog.published
                              ? 'bg-green-200 text-green-800'
                              : 'bg-yellow-200 text-yellow-800'
                          }`}
                        >
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center space-x-3">
                      <Link to={`/viewBlog/${blog._id}`} className="text-blue-400 hover:text-blue-300 font-medium">
                        View
                      </Link>
                      <Link
                        to={`/editBlog/${blog._id}`}
                        className="inline-flex items-center space-x-1 text-white hover:text-yellow-300"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </Link>
                      <button className="inline-flex items-center space-x-1 text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
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
