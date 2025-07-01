"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Save, Eye } from "lucide-react"
// import { blogAPI } from "../services/api"
import toast from "react-hot-toast"
import LoadingSpinner from "../components/LoadingSpinner.jsx"

const EditBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    published: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

//   useEffect(() => {
//     fetchBlog()
//   }, [id])

//   const fetchBlog = async () => {
//     try {
//       setLoading(true)
//       const response = await blogAPI.getBlogById(id)
//       const blog = response.data.blog || response.data
//       setFormData({
//         title: blog.title || "",
//         content: blog.content || "",
//         image: blog.image || "",
//         published: blog.published || false,
//       })
//     } catch (error) {
//       console.error("Error fetching blog:", error)
//       toast.error("Failed to load blog")
//       navigate("/dashboard")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!formData.title.trim() || !formData.content.trim()) {
//       toast.error("Title and content are required")
//       return
//     }

//     setSaving(true)

//     try {
//       await blogAPI.updateBlog(id, formData)
//       toast.success("Blog updated successfully!")
//       navigate("/dashboard")
//     } catch (error) {
//       console.error("Error updating blog:", error)
//       toast.error(error.response?.data?.message || "Failed to update blog")
//     } finally {
//       setSaving(false)
//     }
//   }

//   const handleSaveDraft = async () => {
//     if (!formData.title.trim() || !formData.content.trim()) {
//       toast.error("Title and content are required")
//       return
//     }

//     setSaving(true)

//     try {
//       await blogAPI.updateBlog(id, { ...formData, published: false })
//       toast.success("Draft saved successfully!")
//       navigate("/dashboard")
//     } catch (error) {
//       console.error("Error saving draft:", error)
//       toast.error("Failed to save draft")
//     } finally {
//       setSaving(false)
//     }
//   }

  if (!loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Blog</h1>
        <p className="text-gray-600">Update your blog content.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {!preview ? (
          <form 
        //   onSubmit={handleSubmit} 
          className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your blog title..."
                value={formData.title}
                // onChange={handleChange}
              />
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image URL (optional)
              </label>
              <input
                type="url"
                id="image"
                name="image"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                // onChange={handleChange}
              />
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md"
                    onError={(e) => {
                      e.target.style.display = "none"
                    }}
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your blog content here..."
                value={formData.content}
                // onChange={handleChange}
              />
            </div>

            {/* Published Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                name="published"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.published}
                // onChange={handleChange}
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                Published
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Save size={20} />
                <span>{saving ? "Updating..." : "Update Blog"}</span>
              </button>

              <button
                type="button"
                // onClick={handleSaveDraft}
                disabled={saving}
                className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Save size={20} />
                <span>{saving ? "Saving..." : "Save as Draft"}</span>
              </button>

              <button
                type="button"
                onClick={() => setPreview(true)}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
              >
                <Eye size={20} />
                <span>Preview</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6">
            {/* Preview Mode */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
              <button
                onClick={() => setPreview(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Back to Edit
              </button>
            </div>

            <article className="prose prose-lg max-w-none">
              {formData.image && (
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title || "Untitled"}</h1>
              <div className="whitespace-pre-wrap text-gray-700">{formData.content || "No content yet..."}</div>
            </article>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditBlog
