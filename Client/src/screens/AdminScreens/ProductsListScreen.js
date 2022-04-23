import React, { useContext, useEffect, useReducer } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Helmet } from 'react-helmet-async'
import { Store } from '../../Store'
import { getError } from '../../utils'
import axios from "axios"
import Button from 'react-bootstrap/esm/Button'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const reducer=(state,action)=>{
  switch(action.type){
    case "FETCH_REQUEST":
      return { ...state,loading:true}
    case "FETCH_SUCCESS":
      return {...state,products:action.payload,loading:false}
    case "FETCH_FAIL":
      return{...state,loading:false,error:action.payload}  
    default:
      return state;
  }
}
export default function ProductsListScreen() {
  const navigate=useNavigate()
  const[{loading,products,error},dispatch]=useReducer(reducer,{
    products:[],
    loading:true,
    error:""
  })
  const{state}=useContext(Store)
  const{userInfo}=state;

useEffect(()=>{
const fetchProducts=async()=>{
  dispatch({type:"FETCH_REQUEST"})
  try {
    const result = await axios.get("/api/products",{
      Headers:{
        authorization:`Bearer ${userInfo.token}`
      }
    })
    dispatch({type:"FETCH_SUCCESS",payload:result.data})
  } catch (error) {
    dispatch({type:"FETCH_FAIL",payload:getError(error)})
  }
}
fetchProducts()
},[userInfo])

const deleteHandler=async(id)=>{
  try {
    await axios.delete(`/api/products/${id}`,{
      headers:{
        authorization:` Bearer ${userInfo.token}`
      }
    })
    toast.success("Product deleted successfully.")
    window.location.reload(false)
  } catch (error) {
    toast.error(getError(error))
  }
}
  return (
    <div>
    <Helmet>
    <title>Products List</title>
    </Helmet>

    <h3 className='container small-container text-center'>Available Products</h3>
    <Row>
    <Col>
    <table className="table">
    
    <thead>
    <tr>
    <th>Image</th>
    <th>Name</th>
    <th>Category</th>
    <th>Brand</th>
    <th>Price</th>
    <th>Description</th>
    <th>Stock</th>
    <th colSpan="2">Actions</th>
    </tr>
    </thead>

    <tbody>
 {products.map((product)=>(
   <tr key={product._id}>
   <td>
   <img src={product.image} alt={product.name}
   className="img-fluid rounded img-thumbnail"/>
   </td>
   <td>{product.name}</td>
   <td>{product.category}</td>
   <td>{product.brand}</td>
   <td><span>$</span>{product.price}</td>
   <td>{product.description}</td>
   <td>{product.countInStock}</td>
   <td>
   <Button 
   variant='danger' 
   type='button' 
   className='btn-order'
   onClick={()=>deleteHandler(product._id)}>
   Delete
   </Button>
   </td>

   <td>
   <Button 
   variant='success' 
   type='button'
   className='btn-order'
   onClick={()=>navigate(`/admin/updateproduct/${product._id}`)}
   >
   Edit
   </Button>
   </td>
   </tr>
 ))}
    </tbody>
    </table>
    
    </Col>
    </Row>
    </div>
  )
}
