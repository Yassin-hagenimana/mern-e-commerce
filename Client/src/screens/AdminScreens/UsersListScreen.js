import React, { useContext, useEffect, useReducer } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {getError} from "../../utils"
import {Store} from "../../Store"
import axios from 'axios'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import Button from 'react-bootstrap/Button'
import { Helmet } from 'react-helmet-async'

const reducer=(state,action)=>{
    switch(action.type){
        case "FETCH_REQUEST":
            return{...state,loading:true}
        case "FETCH_SUCCESS":
            return{...state,loading:false,users:action.payload}
        case "FETCH_FAIL":
            return{...state, loading:false, error:action.payload}
        case "DELETE_REQUEST":
            return  {...state,loading:true}
        case "DELETE_SUCCESS":
            return{...state,loading:false,users:action.payload}
        case "DELETE_FAIL":
            return{...state,loading:false,error:action.payload}    

        default:
            return state;

       }
}
export default function UsersListScreen() {
    const{state}=useContext(Store)
    const{userInfo}=state
    const[{loading,error,users},dispatch]=useReducer(reducer,{
        loading:true,
        error:""
    })

    useEffect(()=>{
        const fetchUsers=async()=>{
            dispatch({type:"FETCH_REQUEST"})
            try {
                const{data}= await axios.get("/api/users",
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
        fetchUsers()
    },[userInfo])



return (
    <div>
    <Helmet>
    <title>List of Users</title>
    </Helmet>
    <h4 className='text-center mb-3'>All System Users</h4>

    {loading ? (
        <LoadingBox></LoadingBox>
    ):error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
    <Row>
     <Col md={12}>
     <table className='table'>
      <thead>
      <tr>
      <th>User Id</th>
      <th>Name</th>
      <th>Email</th>
      <th>action</th>
      </tr>
      </thead>
        <tbody>
         {users.map((user)=>(
             <tr key={user._id}>

             <td>{user._id}</td>
             <td>{user.name}</td>
             <td>{user.email}</td>
             <td>
             <Button variant='danger'>
               Delete
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
