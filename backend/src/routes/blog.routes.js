import express from 'express'
import { currentUserBlog, deleteBlog, editABlog, getAllOtherblogs, LikeABlog, postAblog, viewABlog } from '../controllers/blog.controllers.js'
import { protectRoute } from '../middleware/protectRoutes.js'
import router from './auth.routes.js'
const routes=express.Router()

routes.post('/:id',protectRoute,postAblog)
routes.get('/explore',protectRoute,getAllOtherblogs)
routes.get('/myblogs',protectRoute,currentUserBlog)
routes.put('/editBlog/:blogId',protectRoute,editABlog)
routes.get('/viewBlog/:id',protectRoute,viewABlog)
routes.post('/delete/:id',protectRoute,deleteBlog)
routes.post('/like/:id',protectRoute,LikeABlog)
export default routes