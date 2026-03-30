import jwt from "jsonwebtoken"
import User from "../models/user.models.js"
export const checkAuth = async (req,res,next)=>{
  try{
    const token = req.cookies.jwt
    if(!token){
      res.status(400).json({message:"token is required"})
    }
    const decode = jwt.verify(token,process.env.secretkey)
    if(!decode){
       res.status(401).json({message:"unauthorise invalid token"})
    }
    const user = await User.findById(decode.userId).select("-password")
    if(!user) {
       res.status(404).json({message:"user not found"})
    }
    req.user=user
    next()
  }catch(error){
    console.log("error in checkAuth Middleware",error.message);
    res.status(500).json({message:"Internal Server Error"})
    
  }
}