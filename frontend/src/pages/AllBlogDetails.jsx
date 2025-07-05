import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogsStore } from '../store/blogStore'
import LoadingSpinner from '../components/LoadingSpinner'
import MDEditor from '@uiw/react-md-editor'

function AllBlogDetails() {
  const { blogs, getAllBlogs,isblogsLoading,currentPage,totalPages,count} = blogsStore()
  // const [check,setCheck]=useState(()=>{

  // });
  
  const hasFetchedRef = useRef(false)

  const handleLoadMore=() => {
    if(currentPage<totalPages){
      getAllBlogs(currentPage+1);
      //   if(isblogsLoading){
      //   return <LoadingSpinner />
      // }
    }
    
  }

  useEffect(() => {
    if (!hasFetchedRef.current) {
      getAllBlogs(1)
      hasFetchedRef.current = true
    }
  }, [])

  if(isblogsLoading){
    <LoadingSpinner />
  }

  const getPreview = (content) => {
    const words = content.split(' ')
    return {
      preview: words.slice(0, 50).join(' ') + (words.length > 50 ? '...' : ''),
    }
  }

  return (
    <div className="min-h-screen bg-violet-950 text-white py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-[1300px] w-full">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 rounded-xl p-10 mb-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight"
            >
              Explore Blogs that <span className="text-yellow-400">Inspire</span> and <span className="text-green-400">Empower</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-lg text-gray-200 max-w-xl mx-auto"
            >
              Discover insightful articles, guides, and stories from developers and creators across the world.
            </motion.p>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className=" rounded-lg p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => {
              
              const { preview } = getPreview(blog.content)

              return (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-black rounded-lg shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between aspect-auto "
                >
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-green-400 mb-5 line-clamp-2">{blog.title}</h2>
                           {blog.title.length < 27 && (
                        <p className="pt-3 text-transparent"></p>
                      )}
                      <MDEditor.Markdown
                        source={preview}
                        className="text-sm text-white prose prose-invert max-w-none mt-5"
                      />
                    {/* <p className="text-sm text-white line-clamp-8 mt-5">{preview}</p> */}
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-700">
                    <Link
                      to={`/viewBlog/${blog._id}`}
                      className="inline-block text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors duration-200"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Load More Button */}
        {/* currentPage*16>count */}
        
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200" onClick={handleLoadMore}>
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  )
}

export default AllBlogDetails
