import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages//Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  //state variable to display the login popup
  const [showLogin, setShowLogin] = useState(false)

  //ternary operator to display the login popup if true if false will return the fragment
  return (
    <>
    {/*allows us to access the function in the popup component*/}
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>      {/*pass setShowLogin into navbar to access it in the component*/}
      <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = '/cart' element = {<Cart/>} />
          <Route path = '/order' element = {<PlaceOrder/>} />
          <Route path = '/verify' element = {<Verify/>} />
          <Route path = '/myorders'element ={<MyOrders/>} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App

