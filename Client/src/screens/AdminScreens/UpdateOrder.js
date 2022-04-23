import React,{useReducer,useState,useContext,useEffect} from "react"
import Button from "react-bootstrap/Button"
import { Helmet } from "react-helmet-async"
import Form from "react-bootstrap/Form"
import { getError } from '../../utils.js';
import {Store} from "../../Store.js"
import axios from 'axios';
import {useParams } from "react-router-dom";


const reducer=(state,action)=>{
    switch(action.type){
        case "UPDATE_REQUEST":
            return{...state,loading:true}
        case "UPDATE_SUCCESS":
            return{...state,loading:false,order:action.payload}
        case "UPDATE_FAIL":
            return{...state,loading:false,error:action.payload}
        case "FETCH_REQUEST":
            return{...state, loading:true, error:""}
        case "FETCH_SUCCESS":
            return{...state, loading:false, order:action.payload, error:""}
        case "FETCH_FAIL":
            return{...state, loading:false, error:action.payload}
        default:
            return state;
    }
}
export default function UpdateOrder(){
    const{state}=useContext(Store)
    const{userInfo}=state;

    const {id:orderId}=useParams();

    const[{loading,order},dispatch]=useReducer(reducer,{
        loading:true,
        order:[],
        error:""
})
    const[setPaid]=useState()
    const[setDelivered]=useState('')
    const[setUser]=useState()
    const[setDate]=useState()
    const[setTotalPrice]=useState()
    const[setShipping]=useState()


    useEffect(()=>{
        const fetchOrder = async()=>{
            try {
                dispatch({type:"FETCH_REQUEST"})
                const {data}= await axios.get(`/api/orders/${orderId}`,
                {
                    headers:                    {
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                dispatch({type:"FETCH_SUCCESS",payload:data})
            } catch (err) {
                dispatch({type:"FETCH_FAIL",payload:getError(err)})
            }
        }
        fetchOrder()
    },[userInfo,orderId])

    return(
        <div className="container small-container">
        <Helmet>
        <title>Update Order</title>
        </Helmet>
        <h3 className="my-3 text-center">Update Order</h3>
        

    <Form>
    <Form.Group className="mb-3" controlId="paid">
    <Form.Label>Paid</Form.Label>
    <Form.Control
    required
    value={order.isPaid? order.isPaidAt.substring(0, 10): "No"}
    onChange={(e)=>setPaid(e.target.value)}
    disabled/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="delivered">
    <Form.Label>Delivered</Form.Label>
    <Form.Control
    value={order.isDelivered ? order.deliveredAt.substring(0,10) : "No"}
    onChange={(e)=>setDelivered(e.target.value)}
    required/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="name">
    <Form.Label>User</Form.Label>
    <Form.Control
    required
    value={order.user}
    onChange={(e)=>setUser(e.target.value)}
    disabled/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="date">
    <Form.Label>Order Date</Form.Label>
    <Form.Control
    required
    value={order.createdAt}
    onChange={(e)=>setDate(e.target.value)}
    disabled
    />
    </Form.Group>
    <Form.Group className="mb-3" controlId="totalPrice">
    <Form.Label>Total Price</Form.Label>
    <Form.Control
    required
    value={order.totalPrice}
    onChange={(e)=>setTotalPrice(e.target.value)}
    disabled
    />
    </Form.Group>
    <Form.Group className="mb-3" controlId="shippingAddress">
    <Form.Label>Shipping Address</Form.Label>
    <Form.Control
    required
    value={order.shippingAddress}

    onChange={(e)=>setShipping(e.target.value)}
    disabled
    />
    </Form.Group>
    <Button>Update</Button>
    </Form>
        </div>
    )
}