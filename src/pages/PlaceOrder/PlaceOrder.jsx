import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

  //state variable to store form data
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    province:"",
    postalCode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event ) =>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data =>({...data,[name]:value}))
  }

  //direct to paygate
  const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) =>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+20,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("error");
    }
  }

  /*
  check if details are being added and written
  useEffect(()=>{
    console.log(data);
  },[data])
 */

  const navigate = useNavigate();


  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type ="text" placeholder='first name'/>
          <input required name ='lastName' onChange={onChangeHandler} value={data.lastName} type ="text" placeholder='last name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email}  type="email" placeholder='email address'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='street'/>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type ="text" placeholder='city'/>
          <input required name='province' onChange={onChangeHandler} value={data.province} type ="text" placeholder='province'/>
        </div>
        <div className="multi-fields">
          <input required name='postalCode' onChange={onChangeHandler} value={data.postalCode} type ="text" placeholder='postal code'/>
          <input required name='country' onChange={onChangeHandler} value={data.country} type ="text" placeholder='country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='contact'/>
      </div>
      <div className="place-order-right">
                <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>R{getTotalCartAmount()}</p>
              </div>
              <hr/>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>R{getTotalCartAmount()===0?0:20}</p>
              </div>
              <hr/>
              <div className="cart-total-details">
                <b>Total</b>
                <b>R{getTotalCartAmount()===0?0:getTotalCartAmount()+20}</b>
              </div>           
          </div>
          <button type = 'submit'>proceed to pay</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder