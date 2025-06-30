import express from "express"
import { chechAuth, login, logout, signup, updateProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/protectRoutes.js";
const router=express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.put('/profile-section',protectRoute,updateProfile)
router.get('/check',protectRoute,chechAuth)

export default router;