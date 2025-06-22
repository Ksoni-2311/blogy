import express from 'express'
import {currentUserBlog, getAllOtherblogs, postAblog } from '../controllers/blog.controllers.js'
import { protectRoute } from '../middleware/protectRoutes.js'
const routes=express.Router()

routes.post('/:id',protectRoute,postAblog)
routes.get('/explore',protectRoute,getAllOtherblogs)
routes.get('/my-blogs',protectRoute,currentUserBlog)

export default routes