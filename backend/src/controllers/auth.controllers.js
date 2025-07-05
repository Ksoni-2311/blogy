import bcrypt, { hash } from 'bcrypt'
import User from '../models/auth.models.js'
import { generateToken } from '../lib/utils.js'
import cloudinary from '../lib/cloudinary.js'

export const login = async(req, res) => {
    const {email , password}=req.body
    try {
        if (!email) {
            res.status(400).json("Email is required")
            return
        }
        if (!email || !password) {
            res.status(400).json("Invalid Credintials")
            return
        }       
        const user =await User.findOne({email})
        console.log("user=>",user);

        if (!user) {
            res.status(401).json("Unauthorized Access")
            return
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            generateToken(user._id,res)
            res.status(200).json(`welcome ${user.fullName}`)
        }else{
            return res.status(401).json("Invalid crediantials")
        }
    } catch (error) {
        res.status(500).json({ message: "Login failed,Login controller erro", error: error.message });
    }
}

export const signup =async(req, res) => {
    const {fullName, email, password, profilePic } = req.body
    // console.log(req.body);
    try {
        /* 1} take all field .chk !fullname || !email|| !! pass =>all are required
           2} for pass create salt then hash it store them at database 
           3}chk if email already their if true => user already exist please signin
           4}if all ok res.status(200) else give error
         */

        if (!fullName || !email || !password) {
            res.status(400).json("All fields are require")
            return
        }
        if (!fullName) {
            res.status(400).json("Fullname is required")
            return
        }
        if (!email) {
            res.status(400).json("Email is required")
            return
        }
        if (!password) {
            res.status(400).json("Password is required")
            return
        }        
        const isEmailExist =await User.findOne({email})
        if (isEmailExist) {
            res.status(500).json("User already exist. Please login")
            return
        }
        // log("yaha ")

        const salt =await bcrypt.genSalt(10);
        const hashPassword =await bcrypt.hash(password, salt);

        const pic=await cloudinary.uploader.upload(profilePic)

        const newUser =new User({
            fullName,
            email,
            password:hashPassword,
            profilePic:pic.secure_url
        })

        if(!newUser){
            res.status(409).json("Server side error. Try again after a while")
        }else{
            await newUser.save()
            return res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            }
        });
        }
    } catch (error) {
        res.status(400).json("Signup controller error",error.message)
    }
}

export const logout=async (req,res) => {
    try {
        // console.log(user.fullName);
        res.cookie("token","",{maxAge:0})
        res.status(200).json("Logout successfully")
    } catch (error) {
        console.log("Error in logout function",error.message);
    }
}

export const updateProfile=async (req,res) => {
    // collect data from user 
    // get all profrom it and updateById in database 
    // console.log(req.user)
    const {fullName,profilePic,password}=req.body
    // console.log(req.user);
    
    const userId=req.user._id
    try {
        if(!fullName && !profilePic && !password) {
            return res.status(400).json({ message: "Nothing to update" });
        }
        let updateFields={};
        if(fullName) updateFields.fullName=fullName;
        if(profilePic){
            const pic=await cloudinary.uploader.upload(profilePic)
            updateFields.profilePic=pic.secure_url
        }
        if(password){
            const salt =await bcrypt.genSalt(10);
            const hashPassword =await bcrypt.hash(password, salt);
            updateFields.password = hashPassword;
        }
        await User.findByIdAndUpdate(userId,updateFields, { new: true });

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.log("Error in logout function",error.message);
        res.status(500).json("Error in update function")
    }
}
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json("User not found");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};
export const chechAuth=async (req,res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in checkAuth function",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}
