import React,{useReducer,useState} from "react"
import Button from "react-bootstrap/Button"
import { Helmet } from "react-helmet-async"
import Form from "react-bootstrap/Form"

const reducer=(state,action)=>{
    switch(action.type){
        case "UPDATE_REQUEST":
            return{...state,loading:true}
        case "UPDATE_SUCCESS":
            return{...state,loading:false}
        case "UPDATE_FAIL":
            return{...state,loading:false}
        default:
            return state;
    }
}
export default function UpdateOrder(){

    const[{loading},dispatch]=useReducer(reducer,{
        loading:false
    })
    const[paid,setPaid]=useState()
    const[delivered,setDelivered]=useState()
    const[name,setName]=useState()
    const[date,setDate]=useState()
    const[totalPrice,setTotalPrice]=useState()
    const[shipping,setShipping]=useState()


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
    value={paid}
    onChange={(e)=>setPaid(e.target.value)}
    />
    </Form.Group>

    <Form.Group className="mb-3" controlId="delivered">
    <Form.Label>Delivered</Form.Label>
    <Form.Control
    value={delivered}
    onChange={(e)=>setDelivered(e.target.value)}
    required
    />
    </Form.Group>
    <Form.Group className="mb-3" controlId="name">
    <Form.Label>Name</Form.Label>
    <Form.Control
    required
    value={name}
    onChange={(e)=>setName(e.target.value)}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="date">
    <Form.Label>Order Date</Form.Label>
    <Form.Control
    required
    value={date}
    onChange={(e)=>setDate(e.target.value)}
    />
    </Form.Group>
    <Form.Group className="mb-3" controlId="totalPrice">
    <Form.Label>Total Price</Form.Label>
    <Form.Control
    required
    value={totalPrice}
    onChange={(e)=>setTotalPrice(e.target.value)}
    />
    </Form.Group>
    <Form.Group className="mb-3" controlId="shippingAddress">
    <Form.Label>Shipping Address</Form.Label>
    <Form.Control
    required
    value={shipping}
    onChang={(e)=>setShipping(e.target.value)}
    />
    </Form.Group>

    <Button>Update</Button>
    </Form>
        </div>
    )
}