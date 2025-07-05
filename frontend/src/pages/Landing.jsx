import React, { useEffect, useState } from 'react'
import { blogsStore } from '../store/blogStore'
import LoadingSpinner from '../components/LoadingSpinner'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Eye, User } from 'lucide-react'

const Landing = () => {
    const {getAllBlogs,isblogsLoading}=blogsStore()
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllBlogs()
  }, [getAllBlogs])

  

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!isblogsLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Blogy</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover amazing stories, share your thoughts, and connect with writers from around the world.
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>Start Writing</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Latest Blogs</h2>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No blogs available yet.</p>
            <Link
              to="/signup"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Be the first to write!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {blog.image && (
                  <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.content?.substring(0, 150)}...</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{blog.author?.name || "Anonymous"}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                    </div>
                    {blog.views && (
                      <div className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span>{blog.views}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/blog/${blog._id}`}
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <span>Read More</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Landing
