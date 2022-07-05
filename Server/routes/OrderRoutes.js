import express from "express"
import expressAsyncHandler from "express-async-handler"
import {registerDefinition} from "swaggiffy"
import Order from "../Models/OrderModel.js"
import { isAuth } from "../utils.js";
const orderRouter=express.Router()

orderRouter.post("/",isAuth,
expressAsyncHandler(async(req,res)=>{
    const newOrder= new Order({
        orderItems:req.body.orderItems.map((x)=>({...x,product:x._id})),
        shippingAddress:req.body.shippingAddress,
        paymentMethod:req.body.paymentMethod,
        itemsPrice:req.body.itemsPrice,
        shippingPrice:req.body.shippingPrice,
        taxPrice:req.body.taxPrice,
        totalPrice:req.body.totalPrice,
        user:req.user._id
    })

    const order = await newOrder.save()
    res.status(201).send({message:"New Order Created",order})

}))

orderRouter.get("/mine",
isAuth,
expressAsyncHandler(async(req,res)=>{
    const orders=await Order.find({ user:req.user._id })
    res.send(orders)
})
)

orderRouter.get("/:id",isAuth,expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
        res.send(order)
    }else{
        res.status(404).send({message:"Order not found"})
    }
}))


orderRouter.put("/:id/pay",
isAuth,
expressAsyncHandler(async(req,res)=>{

    const order= await Order.findById(req.params.id)
    if(order){
        order.isPaid=true,
        order.paidAt=Date.now(),
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.email_address
        }
        const updatedOrder = await order.save()
        res.send({message:"Order updated",order:updatedOrder})
    }else{
        res.status(404).send({message:"Order not found"})
    }
}))

orderRouter.get("/",isAuth ,
expressAsyncHandler(async(req,res)=>{
    const orders= await Order.find()
    if(orders){
        res.send(orders)
    }else{
        res.status(404).send({message:"No orders found",orders})
    }
    console.log(order)
}))

orderRouter.delete("/",
isAuth,expressAsyncHandler(async(req,res)=>{
    const orders= await Order.deleteMany()
    if(orders){
        res.send({message:"All orders deleted successfully",orders})
    }else{
        res.status(404).send({message:"No orders found."})
    }
}))

orderRouter.delete("/:id",
isAuth,
expressAsyncHandler(async(req,res)=>{
    const order= await Order.deleteOne({id:req.params.id})
    if(order){
        res.status(201).send({message:"Order deleted",order})
    }else{
        res.status(404).send({message:"Order not found!"})
    }
}))

orderRouter.put("/delivery/:_id",
isAuth,
expressAsyncHandler(async(req,res)=>{
    const updateDelivery= await Order.findById({_id:req.params._id})
    if(updateDelivery){
        updateDelivery.isDelivered=true || updateDelivery.isDelivered
        updateDelivery.deliveredAt=Date.now() || updateDelivery.deliveredAt
    }else{
        res.status(404).send({message:"Order delivery not updated successfully"})
    }
}))


registerDefinition(orderRouter,{tags :'Orders',mappedSchema:'Order',basePath:'/api/orders'})

export default orderRouter