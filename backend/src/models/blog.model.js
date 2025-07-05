import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    createdBy: {
        type: String,
        require: true
    }, createrId: {
        type: String,
        require: true
    }, 
    likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [] // ✅ prevents undefined
  }

}, { timestamps: true })

const Blog = mongoose.model("Blog", blogSchema)
export default Blog