import express from "express";
import data from "../data.js";
import Product from '../Models/productModel.js'
import User from "../Models/userModel.js";
const seedRouter=express.Router();

seedRouter.get("/",async(req,res)=>{
    await Product.remove({})
    const createdProducts=await Product.insertMany(data.products)
    res.send({createdProducts})

    await User.remove({})
    const createdUsers=await User.insertMany(data.users)
    res.send({createdUsers})
});

export default seedRouter