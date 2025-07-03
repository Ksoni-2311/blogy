"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Save, Eye } from "lucide-react"
import toast from "react-hot-toast"
import LoadingSpinner from "../components/LoadingSpinner.jsx"
import { blogsStore } from "../store/blogStore.js"
import { motion } from "framer-motion"

const EditBlog = () => {
  const { viewABlog, selectedBlog, isblogsLoading, editABlog } = blogsStore()
  const [formData, setFormData] = useState({
    newTitle: selectedBlog?.title || "",
    newContent: ""
  })
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    viewABlog(id)
  }, [id])

  useEffect(() => {
    if (selectedBlog) {
      setFormData({
        newTitle: selectedBlog.title,
        newContent: selectedBlog.content,
      })
    }
  }, [selectedBlog])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      await editABlog(id, formData)
      toast.success("Blog Updated Successfully!")
      navigate("/dashboard")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong, please try again later.")
    } finally {
      setSaving(false)
    }
  }

  if (isblogsLoading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-10 text-gray-100 mt-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-blue-500 drop-shadow-lg">
            Edit Blog
          </h1>
          <p className="mt-2 text-gray-400">
            Update your blog content below.
          </p>
        </header>

        <motion.div
                className="bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 rounded-2xl shadow-xl p-8"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
          {!preview ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-blue-400 mb-2"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="Enter your blog title..."
                  value={formData.newTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, newTitle: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-blue-600 text-gray-100 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Content */}
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-semibold text-blue-400 mb-2"
                >
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={15}
                  placeholder="Write your blog content here..."
                  value={formData.newContent}
                  onChange={(e) =>
                    setFormData({ ...formData, newContent: e.target.value })
                  }
                  className="w-full px-4 py-4 rounded-lg bg-gray-700 border border-blue-600 text-gray-100 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-y"
                />
              </div>

              {/* Published Checkbox */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  className="h-5 w-5 rounded border-blue-500 text-blue-600 focus:ring-blue-500"
                  // Add your checked logic here
                />
                <label
                  htmlFor="published"
                  className="text-blue-400 font-medium"
                >
                  Published
                </label>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 pt-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg shadow-md transition"
                >
                  <Save size={20} />
                  <span>{saving ? "Updating..." : "Update Blog"}</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-blue-300 font-semibold py-3 rounded-lg shadow-md transition"
                >
                  <Save size={20} />
                  <span>{saving ? "Saving..." : "Save as Draft"}</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setPreview(true)}
                  className="flex-1 flex items-center justify-center space-x-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
                >
                  <Eye size={20} />
                  <span>Preview</span>
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-lg bg-gray-800 shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-400">Preview</h2>
                <button
                  onClick={() => setPreview(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Back to Edit
                </button>
              </div>

              <article className="prose prose-lg max-w-none text-gray-100">
                {formData.newTitle && (
                  <h1 className="mb-4">{formData.newTitle}</h1>
                )}
                <p className="whitespace-pre-wrap">{formData.newContent || "No content yet..."}</p>
              </article>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default EditBlog
