import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, Eye } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import MDEditor from "@uiw/react-md-editor";
import { blogsStore } from "../store/blogStore";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    published: false,
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();
  const { sendAblog } = blogsStore();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      await sendAblog(formData);
      toast.success("Blog created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 pt-24 pb-16 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-center mb-10"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
          Create a <span className="text-yellow-400">New Blog</span>
        </h1>
        <p className="text-gray-300">Write something inspiring and powerful.</p>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 rounded-2xl shadow-xl p-8"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!preview ? (
          <form onSubmit={handleSubmit} className="space-y-6 text-white">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-2 rounded-md bg-gray-900 border border-purple-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your blog title..."
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Markdown Content */}
            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <div data-color-mode="dark" className="bg-white rounded-md overflow-hidden">
                <MDEditor
                  value={formData.content}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, content: val || "" }))
                  }
                  height={400}
                />
              </div>
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-300">Publish immediately</label>
            </div>

            {/* Buttons */}
            <div className="grid sm:grid-cols-2 gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-md text-white font-medium flex items-center justify-center space-x-2 transition"
              >
                <Save size={20} />
                <span>{loading ? "Publishing..." : "Publish"}</span>
              </button>

              <button
                type="button"
                onClick={() => setPreview(true)}
                className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-md text-white font-medium flex items-center justify-center space-x-2 transition"
              >
                <Eye size={20} />
                <span>Preview</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="text-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Blog Preview</h2>
              <button
                onClick={() => setPreview(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-md"
              >
                Back to Edit
              </button>
            </div>

            <h1 className="text-3xl font-extrabold mb-4">{formData.title}</h1>
            <div className="prose prose-invert max-w-none">
              <MDEditor.Markdown source={formData.content} />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CreateBlog;
