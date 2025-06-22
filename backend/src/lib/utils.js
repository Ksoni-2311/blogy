import jwt from "jsonwebtoken"

export const generateToken=(userId,res) => {
    const token=jwt.sign({userId},process.env.SECREAT,
        {expiresIn:"3d"}
    )

    res.cookie("token",token,
        {
            maxAge:7*24*3600*60*1000, //this need to be in milisecond,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !="development"
        }
    )
    return token;
}