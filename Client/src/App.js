import React,{ useContext,useState,useEffect } from "react"
import './App.css';
import HomeScreen from  "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import { BrowserRouter,Routes,Route, Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Badge from "react-bootstrap/Badge"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import {LinkContainer} from "react-router-bootstrap"
import {Store} from "./Store"
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Button from "react-bootstrap/Button";
import { getError } from "./utils";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminScreen from "./screens/AdminScreens/AdminScreen";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import OrdersListScreen from "./screens/AdminScreens/OrdersListScreen"
import UsersListScreen from "./screens/AdminScreens/UsersListScreen";
import UpdateOrder from "./screens/AdminScreens/UpdateOrder";
import ProductsListScreen from "./screens/AdminScreens/ProductsListScreen";
import UpdateProduct from "./screens/AdminScreens/UpdateProduct";



function App() {

  const{state,dispatch:ctxDispatch}= useContext(Store)
  const{cart,userInfo}=state
  
  const signoutHandler = () =>{
    ctxDispatch({type:"USER_SIGNOUT"})
    localStorage.removeItem('userInfo')
    localStorage.removeItem("shippingAddress")
    localStorage.removeItem("paymentMethod")
    window.location.href="/signin"
  }
  const[sidebarIsOpen,setSidebarIsOpen]=useState(false)
  const[categories,setCategories]=useState([])
  useEffect(()=>{
  const fetchCategories=async()=>{
    try {
      const{data}= await axios.get("/api/products/categories")
      setCategories(data)
    } catch (error) {
      toast.error(getError(error))
    }
  }
  fetchCategories()
  })
  return (
<BrowserRouter>
    <div
      className={sidebarIsOpen
      ?'d-flex flex-column site-container active-cont'
      :'d-flex flex-column site-container'}>

    <ToastContainer position="top-right" limit={1} />
    <header>

    <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
    <Button
    variant="dark"
    onClick={()=>setSidebarIsOpen(!sidebarIsOpen)}
    >
    <i className="fas fa-bars"></i>
    </Button>
     <LinkContainer to="/">
     <Navbar.Brand>E-Commerce</Navbar.Brand>
     </LinkContainer>

     <Navbar.Toggle aria-controls="basic-navbar-nav"/>
     <Navbar.Collapse id="basic-navbar-nav">

     <SearchBox/>
     <Nav className="me-auto w-100 justify-content-end">
      <Link to="/cart" className='nav-link'>
      Cart
      {
        cart.cartItems.length> 0 &&(
          <Badge pill bg="danger">
          {cart.cartItems.reduce((a,c) => a + c.quantity, 0)}
          </Badge>
        )}
      
      </Link>
      {userInfo ? (
        <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
        <LinkContainer to="/profile">
        <NavDropdown.Item>User Profile</NavDropdown.Item>
        </LinkContainer>

        <LinkContainer to="/orderhistory">
        <NavDropdown.Item>Order History</NavDropdown.Item>
        </LinkContainer>

        <NavDropdown.Divider/>
        <Link className="dropdown-item"
         to="#signout"
         onClick={signoutHandler}>
        Sign Out
        </Link>
        </NavDropdown>
      ):(
        <Link className="nav-link" to="/signin">
        Sign In
        </Link>
      )}

      {userInfo && userInfo.isAdmin && (
        <NavDropdown title="Admin" id="admin-nav-dropdown">
          <LinkContainer to="/admin/dashboard">
          <NavDropdown.Item>Dashboard</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/admin/productslist">
          <NavDropdown.Item>Products</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/admin/orderslist">
          <NavDropdown.Item>Orders</NavDropdown.Item>
          </LinkContainer>

          <LinkContainer to="/admin/userslist">
          <NavDropdown.Item>Users</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      )}

     </Nav>
     </Navbar.Collapse>
    </Container>
    </Navbar>
    </header>


    <div className={
      sidebarIsOpen?"active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
      :"side-navbar d-flex justify-content-between flex-wrap flex-column"
    }>
    <Nav className="flex-column text-white w-100 p-2">
    <Nav.Item>
    <strong>Categories</strong>
    </Nav.Item>
    {categories.map((category)=>(
      <Nav.Item key={category}>
      <LinkContainer
      to={`/search?category=${category}`}
      onClick={()=>setSidebarIsOpen(false)}
      >
      <Nav.Link className="text-white">{category}</Nav.Link>
      </LinkContainer>
      </Nav.Item>
    ))}
    
    </Nav>
    </div>

    <main>
    <Container className='mt-4'>
         <Routes>
         <Route path='/product/:slug' element={<ProductScreen/>}/>
         <Route path= "/" element={<HomeScreen/>}/>
         <Route path= "/cart" element={<CartScreen/>}/>
         <Route path="/signin" element={<SigninScreen/>}/>
         <Route path="/signup" element={<SignupScreen/>}/>
         <Route path="/shipping" element={<ShippingAddressScreen/>}/>
        <Route path="/payment" element={<PaymentMethodScreen/>}/>
        <Route path="/placeorder" element={<PlaceOrderScreen/>} />
        <Route path="/order/:id" element={
          <ProtectedRoutes> 
          <OrderScreen/>
          </ProtectedRoutes>
        } />

        <Route path="/orderhistory" element={
          <ProtectedRoutes>
          <OrderHistoryScreen/>
          </ProtectedRoutes>
        }/>


        <Route path="/profile" element={
          <ProtectedRoutes>
          <ProfileScreen/>
          </ProtectedRoutes>
        } />

        <Route path="/search" element={<SearchScreen/>}/>
    
        {/*admin route section */}
        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
              <AdminScreen/>
          </AdminProtectedRoute>
        }/>

        <Route path="/admin/userslist" element={
          <AdminProtectedRoute>
          <UsersListScreen/>
          </AdminProtectedRoute>
        }/>

        <Route path="/admin/orderslist" element={
          <AdminProtectedRoute>
          <OrdersListScreen/>
          </AdminProtectedRoute>
        }/>

        <Route path="/admin/updateorder/:id" element={
          <AdminProtectedRoute>
          <UpdateOrder/>
          </AdminProtectedRoute>
        }/>

        <Route path="/admin/updateproduct/:id" element={
          <AdminProtectedRoute>
          <UpdateProduct/>
          </AdminProtectedRoute>
        }/>

        <Route path="/admin/productslist" element={
             <AdminProtectedRoute>
             <ProductsListScreen/>
             </AdminProtectedRoute>
        }/>

        </Routes>
        </Container>
    </main>

    <footer>
    <div className="mt-5 pt-5 pb-5 footer">
<div className="container">
  <div className="row">
    <div className="col-lg-5 col-xs-12 about-company">
      <h2>E-commerce</h2>
      <p className="pr-5 text-white-50">E-commerce platform for buying goods to for customers around the world</p>
      <p><a href="#"><i className="fa fa-facebook-square mr-1"></i></a><a href="#"><i className="fa fa-linkedin-square"></i></a></p>
    </div>
    <div className="col-lg-3 col-xs-12 links">
      <h4 className="mt-lg-0 mt-sm-3">Quick Links</h4>
        <ul className="m-0 p-0">
          <li>- <a href="#">Products</a></li>
          <li>- <a href="#">Home</a></li>
          <li>- <a href="#">Products</a></li>
          <li>- <a href="#">Products</a></li>
          <li>- <a href="#">Products</a></li>
          <li>- <a href="#">Products</a></li>
        </ul>
    </div>
    <div className="col-lg-4 col-xs-12 location">
      <h4 className="mt-lg-0 mt-sm-4">Location</h4>
      <p>Western. Nyabihu-Mukamira</p>
      <p className="mb-0"><i className="fa fa-phone mr-3"></i>(541) 754-3010</p>
      <p><i className="fa fa-envelope-o mr-3"></i>hyassin509@gmail.com</p>
    </div>
  </div>
  <div className="row mt-5">
    <div className="col copyright">
      <p className=""><small className="text-white-50">© 2022. All Rights Reserved.</small></p>
    </div>
  </div>
</div>
</div>
</footer>
    </div>

</BrowserRouter>
)
}

export default App;
