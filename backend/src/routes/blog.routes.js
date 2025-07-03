import express from 'express'
import { currentUserBlog, editABlog, getAllOtherblogs, postAblog, viewABlog } from '../controllers/blog.controllers.js'
import { protectRoute } from '../middleware/protectRoutes.js'
const routes=express.Router()

routes.post('/:id',protectRoute,postAblog)
routes.get('/explore',protectRoute,getAllOtherblogs)
routes.get('/myblogs',protectRoute,currentUserBlog)
routes.put('/editBlog/:blogId',protectRoute,editABlog)
routes.get('/viewBlog/:id',protectRoute,viewABlog)
export default routes