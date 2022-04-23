import React from 'react'
import { Helmet } from 'react-helmet-async'
import {image} from "./p.png"


export default function AdminScreen() {
  return (
    <div>
    <Helmet>
    <title>Admin Panel</title>
    </Helmet>
    <h1 className='text-center'>Admin Panel</h1>


    <div className="containers">
   

  <div className="cards">
  <img className="card-img-top" src={image} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">Products</h5>
    <p className="card-text">Featured list of products that we have in store for selling to our customers.</p>
    <a href="/admin/productslist" class="btn btn-primary">Go to products</a>
  </div>
</div>


<div className="cards">
<img className="card-img-top" src="..." alt="Card image cap"/>
<div className="card-body">
  <h5 className="card-title">Orders</h5>
  <p className="card-text">List of all orders made by customers and their status and progress,delivered and  those nor delivered</p>
  <a href="/admin/orderslist" class="btn btn-primary">Go to orders</a>
</div>
</div>


<div className="cards">
<img className="card-img-top" src="..." alt="Card image cap"/>
<div className="card-body">
  <h5 className="card-title">Users</h5>
  <p className="card-text">List of all users including customers and admins of the system.</p>
  <a href="/admin/userslist" class="btn btn-primary">Go to users</a>
</div>
</div>

</div>

    </div>
  )
}
