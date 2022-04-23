import React, { useContext, useEffect,useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Helmet } from 'react-helmet-async'
import {Store} from "../../Store.js"
import axios from "axios"
import {useNavigate, useParams} from "react-router-dom"
import { toast } from 'react-toastify'

export default function UpdateProduct() {
  const navigate=useNavigate()
  const{state}=useContext(Store)
  const{userInfo}=state
  const params=useParams()
  const{id:productId}=params



  useEffect(()=>{
        getProductById();
    },[])
    const [product, setProduct] = useState({
        name:"",
        category:"",
        price:"",
        description:"",
        countInStock:"",
        brand:"",
    });

    const { name , category , price , description, countInStock ,brand} = product;

    const onInputChange = (e)=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }


    const getProductById= async()=>{
        const productInfo = await axios.get(`/api/products/${productId}`,{
          headers:{
            authorization:`Bearer ${userInfo.token}`
          }
        });
        setProduct(productInfo.data);
    }

    const FormHandler = e =>{
        e.preventDefault();
        updateProduct(product)
    }
    const updateProduct=async(data) =>{
      await  axios.put(`/api/products/${productId}`,data,{
          headers:{
            authorization:`Bearer ${userInfo.token}`
          }
        }).then(
          (response)=>{
                  toast.success("Product Updated Successfully");
                  navigate("/admin/productslist")
            },(error)=>{
                    toast.error("Update failed");
            }
        );
    };

  return (
    <div className='container small-container'>
    <Helmet>
    <title>Update Product</title>
    </Helmet>
    <h3 className='my-3 text-center'>Update Product</h3>


      <Form onSubmit={e=>FormHandler(e)}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control required
            value={name}
            onChange={(e) =>onInputChange(e)}
            name="name"
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Category</Form.Label>
          <Form.Control required
            value={category}
            onChange={(e)=>onInputChange(e)}
            name="category"
          />

        </Form.Group>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Brand</Form.Label>
          <Form.Control required
            value={brand}
            onChange={(e)=>onInputChange(e)}
            name="brand"
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Price</Form.Label>
          <Form.Control required
            value={price}
            onChange={(e)=>onInputChange(e)}
            name="price"
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Description</Form.Label>
          <Form.Control required
            value={description}
            onChange={(e)=>onInputChange(e)}
            name="description"
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Stock quantity</Form.Label>
          <Form.Control required
            value={countInStock}
            onChange={(e)=>onInputChange(e)}
            name="countInStock"
          />
        </Form.Group>

        <Button
        type='submit'
        variant='success'
        >
        Update
        </Button>
      </Form>
    </div>
  )
}
