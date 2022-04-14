import React from "react"
import './App.css';
import { useContext } from 'react';
import HomeScreen from  "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import { BrowserRouter,Routes,Route, Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Badge from "react-bootstrap/Badge"
import Nav from "react-bootstrap/Nav"
import NavDropDown from "react-bootstrap/NavDropDown"
import {LinkContainer} from "react-router-bootstrap"
import {Store} from "./Store"
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";



function App() {

  const{state,dispatch:ctxDispatch}= useContext(Store)
  const{cart,userInfo}=state
  
  const signoutHandler =() =>{
    ctxDispatch({type:"USER_SIGNOUT"})
    localStorage.removeItem('userInfo')
    localStorage.removeItem("shippingAddress")
    localStorage.removeItem("paymentMethod")
  }
  return (
<BrowserRouter>
    <div className='d-flex flex-column site-container'>
    <ToastContainer position="top-center" limit={1} />
    <header>

    <Navbar bg="dark" variant="dark">
    <Container>
     <LinkContainer to="/">
     <Navbar.Brand>Amazona</Navbar.Brand>
     </LinkContainer>

     <Nav className="me-auto">
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
        <NavDropDown title={userInfo.name} id="basic-nav-dropdown">
        <LinkContainer to="/profile">
        <NavDropDown.Item>User Profile</NavDropDown.Item>
        </LinkContainer>

        <LinkContainer to="/orderhistory">
        <NavDropDown.Item>Order History</NavDropDown.Item>
        </LinkContainer>

        <NavDropDown.Divider/>
        <Link className="dropdown-item"
         to="#signout"
         onClick={signoutHandler}>
        Sign Out
        </Link>
        </NavDropDown>
      ):(
        <Link className="nav-link" to="/signin">
        Sign In
        </Link>
      )}

     </Nav>
    </Container>
    </Navbar>
    </header>



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
        <Route path="/order/:id" element={<OrderScreen/>} />
        </Routes>
        </Container>
    </main>

    <footer>
    <div className="text-center">All rights reserved.</div>
    </footer>
    </div>

</BrowserRouter>
)
}

export default App;
