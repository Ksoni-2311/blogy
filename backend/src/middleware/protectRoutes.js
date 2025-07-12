import jwt from "jsonwebtoken";
import User from "../models/auth.models.js";

export const protectRoute = async (req, res, next) => {
    /* 1->grab token from the cookies
       2->we will decode token via token and secreat 
       3->we used userid in generating this token so on decoding it will give back userId
       4->we will find the user form the db except the password 
       5->store req.user for further use so that u can use it in future
       6->call next()    
    */
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({ message: "Unauthorized: No token found" });
        }

        const decodedToken=jwt.verify(token,process.env.SECREAT)
        
        if(!decodedToken){
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        
        const user=await User.findById(decodedToken.userId).select("-password")
        
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        req.user=user;
        next();
        console.log("all ok");
    } 
    catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        res.status(500).json({ message: "Internal server error in auth middleware" });
    }
};
