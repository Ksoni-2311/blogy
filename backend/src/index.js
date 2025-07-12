import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
import cors from 'cors';

import { connectDB } from './lib/db.js';
import path from 'path';

import cookieParser from 'cookie-parser';
import { app, server } from './lib/socket.js';

// Load environment variables
dotenv.config();
console.log("✅ Environment variables loaded.");

const PORT = process.env.PORT || 7000;
const __dirname = path.resolve();
console.log(`📁 Project root directory: ${__dirname}`);

app.use(cookieParser());
console.log("🍪 cookie-parser middleware added.");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
console.log("🌐 CORS middleware configured for http://localhost:5173.");

// Middleware
app.use(express.json({ limit: "50mb" }));
console.log("🛠️ express.json middleware added with 10mb limit.");

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
console.log("🛠️ express.urlencoded middleware added with 10mb limit.");



// Routes
try {
  app.use('/user', authRoutes);
  console.log("👤 Auth routes mounted at /user.");
} catch (err) {
  console.error("❌ Failed to mount auth routes at /user:", err);
}

try {
  app.use('/blog', blogRoutes);
  console.log("📝 Blog routes mounted at /blog.");
} catch (err) {
  console.error("❌ Failed to mount blog routes at /blog:", err);
}


// Static files for production
if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../frontend/dist");
  console.log("🚀 Production mode detected.");
  console.log(`📦 Serving static files from: ${staticPath}`);

  try {
    app.use(express.static(staticPath));
    console.log("Static middleware added.");

    app.get("*", (req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
    console.log("Catch-all route for SPA added.");
  } catch (err) {
    console.error("Error setting up static middleware or catch-all route:", err);
  }
}

// Start server
server.listen(PORT,  () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  try {
    connectDB();
    console.log("✅ Database connected successfully.");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
});
