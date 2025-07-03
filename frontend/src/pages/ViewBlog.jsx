import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogsStore } from '../store/blogStore'
import LoadingSpinner from '../components/LoadingSpinner'

function ViewBlog() {
  const { id } = useParams()
  const { viewABlog, selectedBlog, isblogsLoading } = blogsStore()

  useEffect(() => {
    viewABlog(id)
  }, [id, viewABlog])

  if (isblogsLoading || !selectedBlog) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-16 mt-15">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-5xl mx-auto bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-lg p-10 space-y-8"
      >
        {/* Blog Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-yellow-400 tracking-tight pb-10 border-b-5 border-emerald-400"
        >
          {selectedBlog.title}
        </motion.h1>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="prose lg:prose-xl max-w-none text-gray-200 prose-invert"
        >
          <p className="whitespace-pre-wrap leading-relaxed text-lg">
            {selectedBlog.content}
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
          >
            ← Back to Blogs
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ViewBlog
