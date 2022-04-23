import React,{useState,useContext,useEffect} from "react"
import Button from "react-bootstrap/Button"
import { Helmet } from "react-helmet-async"
import Form from "react-bootstrap/Form"

import {Store} from "../../Store.js"
import axios from 'axios';
import {useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"
import { getError } from "../../utils.js"


export default function UpdateOrder(){
    const navigate=useNavigate()
    const{state}=useContext(Store)
    const{userInfo}=state;
    const {id:orderId}=useParams();

useEffect(()=>{
    getOrderById()
},[])

const[order,setOrder]=useState({
    isDelivered:"",
    isPaid:"",
    user:"",
    createdAt:"",
    totalPrice:"",
    shippingAddress:"",
})
const{isDelivered,isPaid,user,createdAt,totalPrice,shippingAddress}=order;

const getOrderById=async()=>{
    const orderInfo=await axios.get(`/api/orders/${orderId}`,{
        headers:{
            authorization:`Bearer ${userInfo.token}`
        }
    })
    setOrder(orderInfo.data)
}

const OnInputChange=(e)=>{
    setOrder({...order,[e.target.name]:e.target.value})
}

const formHandler=(e)=>{
e.preventDefault()
updateOrderDelivery(order)
console.log(order)
}

const updateOrderDelivery=async(data)=>{
    await axios.put(`api/orders/delivery/${orderId}`,data,{
        headers:{
            authorization:`Bearer ${userInfo.token}`
        }
    })
    .then(res=>{
        toast.success("Order updated successfully.")
        navigate("/admin/orderslist")
    })
    .catch(err=>{
        toast(getError(err))
    })
}
    return(
        <div className="container small-container">
        <Helmet>
        <title>Update Order</title>
        </Helmet>
        <h3 className="my-3 text-center">Update Order</h3>
        

    <Form onSubmit={e=>formHandler(e)}>
    <Form.Group className="mb-3" controlId="paid">
    <Form.Label>Paid</Form.Label>
    <Form.Control
    required
    value={isPaid}
    onChange={(e)=>OnInputChange(e)}
    name="isPaid"
    />
    </Form.Group>
    <Form.Group className="mb-3" controlId="delivered">
    <Form.Label>Delivered</Form.Label>
    <Form.Control
    required
    value={isDelivered}
    onChange={(e)=>OnInputChange(e)}
    name="isDelivered"
    />
    </Form.Group>
    <Form.Group className="mb-3" controlId="name">
    <Form.Label>User</Form.Label>
    <Form.Control
    required
    value={user}
    onChange={(e)=>OnInputChange(e)}
    name="user"/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="date">
    <Form.Label>Order Date</Form.Label>
    <Form.Control
    required
    value={createdAt.substring(0,10)}
    onChange={(e)=>OnInputChange(e)}
    name="createdAt"
    />
    </Form.Group>
    <Form.Group className="mb-3" controlId="totalPrice">
    <Form.Label>Total Price</Form.Label>
    <Form.Control
    required
    value={totalPrice}
    onChange={(e)=>OnInputChange(e)}
    name="totalPrice"
    />
    </Form.Group>
    <Form.Group className="mb-3" controlId="shippingAddress">
    <Form.Label>Shipping Address</Form.Label>
    <Form.Control
    required
    value={[shippingAddress.city,shippingAddress.country]}
    onChange={(e)=>OnInputChange(e)}
    name="shippingAddress"
    />
    </Form.Group>
    <Button>Update</Button>
    </Form>
        </div>
    )
}