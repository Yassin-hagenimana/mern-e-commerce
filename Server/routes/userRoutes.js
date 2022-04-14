import express from "express"
import bcrypt from "bcryptjs"
import User from "../Models/userModel.js";
import { generateToken } from "../utils.js";
import expressAsyncHandler from "express-async-handler"
const userRouter=express.Router()

userRouter.get("/",async(req,res)=>{
    const users= await User.find()
    if(users){
        res.send(users)
    }else{
        res.status(404).send({message:"NO users found"})
    }
})


userRouter.post("/signin",
expressAsyncHandler(async(req,res)=>{

    const user = await User.findOne({email:req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
             res.send({
                 _id:user._id,
                 name:user.name,
                 email:user.email,
                 isAdmin:user.isAdmin,
                 token:generateToken(user)
             })
             return
        }
    }
    res.status(401).send({message:"Invalid email or password"})
}))


userRouter.post("/signup",
expressAsyncHandler(async(req,res)=>{
    const foundUser= await User.findById({email:req.body.email})
    if(foundUser.length>0)
    res.status(403).send({massage:"User with email already exists."})
    
    const newUser= new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password)
    })
    const user = await newUser.save()
    res.send({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user)
    })
}))
export default userRouter;