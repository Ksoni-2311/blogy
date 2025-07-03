import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Computer,
  LogOut,
  PlusCircle,
  RectangleGoggles,
  Settings,
  User,
  Panda,
} from 'lucide-react'
import { authUserStore } from '../store/authStore'

function Navbar() {
  const { authUser, logout } = authUserStore()

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed w-full top-0 z-40 bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 backdrop-blur-md shadow-md border-b border-purple-700"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center"
            >
              <Panda size={28} strokeWidth={1.5} className="text-primary" color="#60a5fa" />
            </motion.div>
            <h1 className="text-2xl font-extrabold text-white hidden sm:block tracking-wide">
              Blogy
            </h1>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-4 text-white">
            {authUser && (
              <>
                <NavButton icon={<RectangleGoggles />} to="/" label="Explore" />
                <NavButton icon={<Computer />} to="/dashboard" label="Dashboard" />
                <NavButton icon={<PlusCircle size={18} />} to="/create" label="Create" />
                <NavButton icon={<User />} to="/profile" label="Profile" />
              </>
            )}

            {/* <NavButton icon={<Settings size={18} />} to="/settings" label="Settings" /> */}

            {authUser && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 hover:text-red-400 transition"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}

function NavButton({ icon, to, label }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="text-white hover:text-yellow-300 transition"
    >
      <Link to={to} className="flex items-center gap-2 text-sm">
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </Link>
    </motion.div>
  )
}

export default Navbar
