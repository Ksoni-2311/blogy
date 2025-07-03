import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  },
  exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
}

const buttonVariants = {
  hover: { scale: 1.1, backgroundColor: "#2563eb", boxShadow: "0px 0px 8px rgb(37 99 235)" },
  tap: { scale: 0.95 }
}

function CommonPage() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1 
        className="text-[10rem] font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        404
      </motion.h1>
      <motion.h2 
        className="text-4xl sm:text-5xl font-bold mb-4 text-white drop-shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Page Not Found
      </motion.h2>
      <motion.p
        className="max-w-xl text-center text-lg text-indigo-200 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Oops! The page you are looking for does not exist or has been moved.
      </motion.p>

      {/* <motion(Link)
        to="/"
        className="px-8 py-3 rounded-md bg-pink-600 text-white font-semibold shadow-lg"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Go Back Home
      </motion(Link> */}
      <motion.button
      className='bg-purple-700 p-5 rounded-3xl'
      >
        <Link to={"/dashboard"}>
            Go to HomePage
        </Link>
      </motion.button>
    </motion.div>
  )
}

export default CommonPage
