import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
export const connectDB=async () => {
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDb connection successfull at ${conn.connection.host}`);
    } catch (error) {
        console.error("error connecting mongodb",error);
    }
}