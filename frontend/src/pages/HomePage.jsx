import React, { useEffect, useRef } from 'react'
import { blogsStore } from '../store/blogStore'
import { Link } from 'react-router-dom'
import { Calendar, Eye, PlusCircle, Trash2,Edit } from 'lucide-react'
import { authUserStore } from '../store/authStore'

function HomePage() {
  const {myBlogs,getUserAllBlogs,count} = blogsStore()
  const {authUser}=authUserStore()
 
  const hasFetchedRef = useRef(false);

  useEffect(() => {
  if (!hasFetchedRef.current) {
    getUserAllBlogs();
    hasFetchedRef.current = true;
  }
}, []);

  // console.log(getUserAllBlogs())
  
  return (
    <div className="max-w-6xl mx-auto mt-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white-900 mb-2">Welcome back, 
          {authUser?.fullName}!
          </h1>
        <p className= "text-white">Manage your blogs and create new content.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Blogs</h3>
          <p className="text-3xl font-bold text-blue-600">{count}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Views</h3>
          <p className="text-3xl font-bold text-green-600">
            {myBlogs.reduce((total, blog) => total + (blog.views || 0), 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Published</h3>
          <p className="text-3xl font-bold text-purple-600">{myBlogs.filter((blog) => blog.published).length}</p>
        </div>
      </div>

      {/* Create New Blog Button */}
      <div className="mb-8">
        <Link
          to="/create"
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={20} />
          <span>Create New Blog</span>
        </Link>
        {/* <button onClick={getUserAllBlogs()}>getUserAllBlogs</button> */}
      </div>

      {/* Blogs List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Your Blogs</h2>
        </div>

        {myBlogs.length ===0  ? (
          <div className="p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">You haven't created any blogs yet.</p>
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <PlusCircle size={18} />
              <span>Create Your First Blog</span>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {myBlogs.map((blog) => (
              <div key={blog._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">{blog.content?.substring(0, 150)}...</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                          blog.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link to={`/blog/${blog._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      View
                    </Link>
                    <Link
                      to={`/edit-blog/${blog._id}`}
                      className="inline-flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </Link>
                    <button
                      // onClick={() => handleDeleteBlog(blog._id)}
                      className="inline-flex items-center space-x-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage