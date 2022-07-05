import express from "express";
import data from "../data.js";
import Product from '../Models/productModel.js'
import User from "../Models/userModel.js";
const seedRouter=express.Router();


/**
 * @swagger
 * /api/seed:
 *   get:
 *     summary: Returns the list of all the users and products inserted
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users and products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas'
 */
seedRouter.get("/",async(req,res)=>{
    await Product.remove({})
    const createdProducts=await Product.insertMany(data.products)
    res.send({createdProducts})

    await User.remove({})
    const createdUsers=await User.insertMany(data.users)
    res.send({createdUsers})
});

export default seedRouter