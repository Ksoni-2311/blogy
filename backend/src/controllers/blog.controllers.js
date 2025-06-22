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
        const userId=req.user._id;
        const allBlogs=await Blog.find({createrId:{$ne:userId}})
            .sort({ createdAt: -1 }); // 👈 Sort newest first

        res.status(200).json(allBlogs);

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
   console.log(userId);
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