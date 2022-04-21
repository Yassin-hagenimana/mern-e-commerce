import React, { useContext, useEffect, useReducer } from 'react'
import {Store} from "../../Store"
import {getError} from  '../../utils'
import axios from 'axios'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet-async'

const reducer=(state,action)=>{
    switch(action.type){
        case "FETCH_REQUEST":
            return{...state,loading:true}
        case "FETCH_SUCCESS":
            return{...state,orders:action.payload,loading:false}
        case "FETCH_FAIL":
            return{...state,loading:false,error:action.payload}
        default:
            return state;
    }
}
export default function OrdersListScreen() {
 const navigate=useNavigate()
    const[{loading,error,orders},dispatch]=useReducer(reducer,{
        loading:true,
        error:''
    })
    const {state}=useContext(Store)
    const{userInfo}=state

    
    useEffect(()=>{
        dispatch({type:"FETCH_REQUEST"})
        const fetchData= async()=>{
        try {
            const {data}=await axios.get("/api/orders",
            {
                headers:{
                    authorization: `Bearer ${userInfo.token}`
                }
            })
            dispatch({type:"FETCH_SUCCESS",payload:data})
        } catch (error) {
            dispatch({type:"FETCH_FAIL",payload:getError(error)})
        }
    }
    fetchData()
    },[userInfo])
  return (
    <div>
    <Helmet>
    <title>List of orders</title>
    </Helmet>
    <h3 className='text-center mb-3'>List of all  orders</h3>

    {loading?(
        <LoadingBox></LoadingBox>
    ):error?(<MessageBox variant="danger">{error}</MessageBox>
    ):(
 <Row>
 <Col>
 <table className='table w-100'>
 <thead>
 <tr>
   <th>Order Id</th>
   <th>Paid</th>
   <th>Delivered</th>
   <th>Order Date</th>
   <th>Total price</th>
   <th>Shipping Address</th>
   <th>User</th>
    <th>Actions</th>
   </tr>
   </thead>
   <tbody>
   {orders.map((order)=>(
       <tr key={order._id}>
        <td>{order._id}</td>
        <td>{order.isPaid? order.isPaidAt.substring(0, 10): "No"}</td>
        <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : "No"}</td>
        <td>{order.createdAt.substring(0,10)}</td>
        <td>{order.totalPrice}</td>
        <td>{order.shippingAddress.city}</td>
        <td>{order.user}</td>
        <td>
        <Button type="button"
            variant="light"
            className='btn-primary'
            onClick={()=>{
                navigate(`/order/${order._id}`)
            }}>
             Details
            </Button>
        </td>
       </tr>
   ))
}
   </tbody>
 </table>
 </Col>
 </Row>
)}
    </div>
  )
}