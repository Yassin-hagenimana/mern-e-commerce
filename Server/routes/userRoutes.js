import express from "express"
import bcrypt from "bcryptjs"
import User from "../Models/userModel.js";
import { generateToken, isAuth } from "../utils.js";
import { registerDefinition } from 'swaggiffy';
import expressAsyncHandler from "express-async-handler"
const userRouter=express.Router()

userRouter.get("/",async(req,res)=>{
    const users= await User.find()
    if(users){
        res.send(users)
    }else{
        res.status(404).send({message:"No users found"})
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



userRouter.put("/profile",
isAuth,
expressAsyncHandler(async(req,res)=>{
    const user= await User.findById(req.user._id)
    if(user){
        user.name=req.body.name || user.name
        user.email=req.body.email || user.email

        if(req.body.password){
            user.password=bcrypt.hashSync(req.body.password, 8)
        }
        const updatedUser=await user.save()
        res.send({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(updatedUser)
        })
    }else{
        res.status(404).send({message:"User not found"})
    }
}))

userRouter.delete("/:id",isAuth,async(req,res)=>{
    const user=await User.deleteOne({id:req.params.id})
    if(user){
        res.send({user,message:"User deleted"})
    }else{
        res.status(404).send({message:"User not found"})
    }
})
registerDefinition(userRouter, {tags: 'Users', mappedSchema: 'User', basePath: '/api/users'});
export default userRouter;