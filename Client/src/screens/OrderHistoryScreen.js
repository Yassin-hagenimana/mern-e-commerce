import axios from 'axios'
import React,{useEffect,useReducer,useContext} from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { Store } from '../Store'
import { getError } from '../utils'
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const reducer=(state,action)=>{
    switch(action.type){
        case "FETCH_REQUEST":
            return{...state, loading:true}
        case "FETCH_SUCCESS":
            return{...state, loading:false, orders:action.payload}
        case "FETCH_FAIL":
            return{...state, loading:false, error:action.payload}
        default:
            return state;
    }
}
export default function OrderHistoryScreen() {
    const navigate=useNavigate()

    const {state}=useContext(Store)
    const {userInfo}=state;

    const[{loading,error,orders},dispatch]=useReducer(reducer,{
        loading:true,
        error:"",
    })

    useEffect(() => {
        const fetchData=async()=> {
            dispatch({type:"FETCH_REQUEST"})
            try {
                const {data}=await axios.get(`/api/orders/mine`,
                {headers:{authorization: `Bearer ${userInfo.token}`}}
                
                )
                dispatch({type:"FETCH_SUCCESS",payload:data})
            } catch (err) {
                dispatch({type:"FETCH_FAIL",payload:getError(err)})
            }
        }
        fetchData()
    }, [userInfo])
  return (
    <div>
    <Helmet>
    <title>Order History</title>
    </Helmet>

    <h1 className='text-center mb-3'>Order History</h1>
    {loading?(
        <LoadingBox></LoadingBox>
    ):error?(
        <MessageBox variant="danger">{error}</MessageBox>
    ):(
        <Row>
        <Col md={12} >
        <table className="table">
        <thead>
        <tr>
        <th>Id</th>
        <th>Date</th>
        <th>Total</th>
        <th>Paid</th>
        <th>Delivered</th>
        <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {orders.map((order)=>(
            <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0,10)}</td>
            <td>{order.totalPrice.toFixed(2)}</td>
            <td>{order.isPaid? order.isPaidAt.substring(0, 10): "No"}</td>
            <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : "No"}</td>

            <td>
            <Button type="button"
            variant="light"
            onClick={()=>{
                navigate(`/order/${order._id}`)
            }}>
             Details
            </Button>
            </td>
            
            </tr>
        ))}
        </tbody>
        </table>
        </Col>
        </Row>
    )}
    
    </div>
  )
}
