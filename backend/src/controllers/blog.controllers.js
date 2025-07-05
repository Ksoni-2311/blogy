import Blog from "../models/blog.model.js"

export const postAblog=async (req,res) => {
    /*
        1->extract title and content from req.body 
        2->if !title && !content return =>blog cant be empty
        3->else->add it to Blog in db 
    */
    const {title,content}=req.body
    const createdBy=req.user?.fullName
    const createrId=req.user?._id
    // console.log(createdBy);
    try {
        if(!title || title.trim()===""){
            return res.status(400).json("Title is required")
        }
        if(content.trim()===""){
            return res.status(400).json("You cant post an empty blog")
        }
        const newBlog=new Blog({
            title,content,createdBy,createrId
        })

        await newBlog.save(); // ✅ save to DB
        console.log(newBlog);
        return res.status(200).json({ message: "Blog posted successfully", blog: newBlog });
    } catch (error) {
        console.log("error in postAblog function:",error.message);
        return res.status(400).json("Error in postAblog Function")
    }
}
export const getAllOtherblogs=async (req,res) => {
    try {
        // added skip , limit ,page
        const userId=req.user._id;
        const limit=parseInt(req.query.limit) || 15;
        const page=parseInt(req.query.page) || 1;

        const allBlogs=await Blog.find({createrId:{$ne:userId}})
            .sort({ createdAt: -1 })
            .skip((page-1)*limit)
            .limit(limit);
             // 👈 Sort newest first

        const total = await Blog.countDocuments({ createrId: { $ne: userId } });

        res.status(200).json({
        blogs: allBlogs,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total
        });

    } catch (error) {
        console.error("Error in authBlog function", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
export const currentUserBlog=async (req,res) => {
    /*
        1->to get all blogs from databae where req.user._id==creater.Id
        2->and return it 
    */
   const userId=req.user._id;
    //    console.log(userId);
   try {
    if (!userId) {
        return res.status(400).json("Unauthorised Access")
    }
    const myBlogs=await Blog.find({createrId:userId})
        .sort({ createdAt: -1 }); // 👈 Sort newest first

    res.status(200).json({count: myBlogs.length,myBlogs});

   } catch (error) {
        console.error("Error in authBlog function", error.message);
        res.status(500).json({ error: "Internal server error" });
   }

}
export const editABlog=async (req,res) => {
    const {newTitle,newContent}=req.body
    const {blogId}=req.params
    try {        
        // take req.body and make changes as per data given 
         const updatedFields = {
            title: newTitle,
            content: newContent,
            }

            const blog=await Blog.findByIdAndUpdate(blogId,updatedFields,{new:true})
            if (!blog) {
                res.status(404).json({error:"No blog found"})
            } 
                res.status(200).json({
                message: "Blog updated successfully",
                blog,
                })
    } catch (error) {
        console.error("Error in editing blog:", error)
        res.status(500).json({ error: "Server error while updating blog" })
    }
}
export const viewABlog = async (req, res) => {
  const { id } = req.params 
  const {userId}=req.user._id
  console.log(req.params);

  try {
    const blog = await Blog.findById(id)

    // console.log("Blog ID:", id)
    // console.log("Found Blog:", blog)

    if (!blog) {
      return res.status(404).json({ message: "No blog found" })  
    }

    res.status(200).json(blog)  
  } catch (error) {
    console.log("Error in viewing a blog:", error)
    res.status(500).json({ message: "Server error", error })
  }
}
export const deleteBlog=async (req,res) => {
    const {id}=req.params
    try {
        // get id from param and set it delte it from database
        const blog=await Blog.findByIdAndDelete(id);
        console.log(blog);
        res.status(200).json("Blog deleted Successfully")
    } catch (error) {
        res.status(500).json(error?.response.message)
        console.log(error.message);
    }
}
export const LikeABlog=async (req,res) => {
    // take user._id as its protected route then we have a like array so we wil update it as per req
    const {id}=req.params;
    const userId=req.user._id
    try {
        console.log("initiated",id,userId);
        const blog=await Blog.findById(id)
        console.log(blog);
        if (!blog) return res.status(404).json({ message: "Blog not found" })
            
        if (!Array.isArray(blog.likes)) blog.likes = []
        const alreadyLiked = blog.likes.includes(userId)
            
        if(alreadyLiked){
            blog.likes=blog.likes.filter(uid=>uid.toString()!==userId.toString())
        }else{
            blog.likes.push(userId)
        }
        await blog.save()

        res.status(200).json({
             message: alreadyLiked ? "Unliked blog" : "Liked blog",
            likesCount: blog.likes.length,
            likedByUser: !alreadyLiked
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Error in like Controller")
    }
}