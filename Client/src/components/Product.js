import React from "react"
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Rating from "../components/Rating"
import {useContext} from "react"
import {Store} from "../Store.js"

import axios from "axios"
export default function Product(props){
const {product}=props;
const{state, dispatch:ctxDispatch}=useContext(Store)

const{
    cart:{cartItems},
}=state
const addToCartHandler=async(item) =>{
    const existItem=cartItems.find((x)=>x._id===product._id)
    const quantity=existItem?existItem.quantity + 1 : 1

    const {data} = await axios.get(`api/products/${item._id}`)
  if(data.countInStock < quantity){
    window.alert("Sorry, product is out of stock.")
    return;
  }
  ctxDispatch({
    type: "CART_ADD_ITEM",
    payload: { ...item, quantity}
  });
  }
    return(
        <div>
        <Card key={product.slug} className="product">
    
    <Link to={`/product/${product.slug}`}>
    <img src={product.image} alt={product.name} className="card-img-top"/>
    </Link>

    <Card.Body>
    <Link to={`/product/${product.slug}`}>
    <Card.Title>{product.name}</Card.Title>
    </Link>
    <Card.Text>{product.name}</Card.Text>
    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
    {product.countInStock === 0?(<Button variant="light" disabled>Out of stock</Button>
    ):(
    <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
    )}
    </Card.Body>
   
    </Card>
        </div>
    )
    
}