import express from 'express'
import authRoutes from './routes/auth.routes.js'
import blogRoutes from './routes/blog.routes.js'
import {connectDB} from './lib/db.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

dotenv.config()

const PORT=process.env.PORT || 7778;

const app=express()
app.use(express.json());
app.use(cookieParser());
// author , reader ,

app.use('/user',authRoutes)
app.use("/blog",blogRoutes)

app.listen(PORT,()=>{
    console.log(`app is listening at port ${PORT}`);
    connectDB()
})
