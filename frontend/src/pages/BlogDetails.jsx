"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Calendar, User, Eye, ArrowLeft } from "lucide-react"
// import { blogAPI } from "../services/api"
import toast from "react-hot-toast"
import LoadingSpinner from "../components/LoadingSpinner"
import { blogsStore } from "../store/blogStore"

const BlogDetail = () => {
  const {blogs}=blogsStore()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

//   useEffect(() => {
//     fetchBlog()
//   }, [id])

  // const fetchBlog = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await blogAPI.getBlogById(id)
  //     setBlog(response.data.blog || response.data)
  //   } catch (error) {
  //     console.error("Error fetching blog:", error)
  //     toast.error("Failed to load blog")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const formatDate = (dateString) => {
  //   return new Date(dateString).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   })
  // }

  // if (loading) {
  //   return <LoadingSpinner />
  // }

  if (!blogs) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg mb-4">Blog not found.</p>
        <Link to="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Blog Content */}
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* {blog.image && (
          <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-64 md:h-96 object-cover" />
        )} */}

        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span>{blog.author?.name || "Anonymous"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              {/* <span>{formatDate(blog.createdAt)}</span> */}
            </div>
            {blog.views && (
              <div className="flex items-center space-x-2">
                <Eye size={16} />
                <span>{blog.views} views</span>
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{blog.content}</div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlogDetail
