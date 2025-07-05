import express from 'express'
import authRoutes from './routes/auth.routes.js'
import blogRoutes from './routes/blog.routes.js'
import {connectDB} from './lib/db.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import {io,app,server} from './lib/socket.js'
dotenv.config()

const PORT=process.env.PORT || 7778;

// app.use(express.json());
app.use(express.json({ limit: "10mb" }));
console.log("express.json middleware added with 10mb limit.");

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
console.log("express.urlencoded middleware added with 10mb limit.");
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}));


// author , reader ,

app.use('/user',authRoutes)
app.use("/blog",blogRoutes)

server.listen(PORT,()=>{
    console.log(`app is listening at port ${PORT}`);
    connectDB()
})
