import express from 'express'
import { currentUserBlog, deleteBlog, editABlog, getAllOtherblogs, LikeABlog, postAblog, viewABlog } from '../controllers/blog.controllers.js'
import { protectRoute } from '../middleware/protectRoutes.js'
const routes=express.Router()

routes.get('/explore',protectRoute,getAllOtherblogs)
console.log("log1");

routes.get('/myblogs',protectRoute,currentUserBlog)
console.log("log2");
routes.put('/editBlog/:blogId',protectRoute,editABlog)
console.log("log3");
routes.get('/viewBlog/:id',protectRoute,viewABlog)
console.log("log4");
routes.post('/delete/:id',protectRoute,deleteBlog)
console.log("log5");
routes.post('/like/:id',protectRoute,LikeABlog)
console.log("log6");
routes.post('/create/:id',protectRoute,postAblog)
console.log("log7");
export default routes