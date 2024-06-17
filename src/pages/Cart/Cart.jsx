import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems, food_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext);//retrieve functionality from context

  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((item,index)=>{/* gets the food list from items*/
            if(cartItems[item._id]>0) 
            /*if food item is available in cart item display it in page
            also returns a div
            */ 
            {
              /*the return statement can only return 1 item 
              so the items are nested inside of the div
              */
              return(    
              <div>
                { /*this div displays the items in the cart and statistics*/}
                <div className='cart-items-title cart-items-item'>
                  <img src={url + "/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>R{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>R{item.price*cartItems[item._id]}</p>{/*price will be multiplied by quantity*/} 
                  <p onClick={()=>removeFromCart(item._id)}className='cross'>x</p> {/*onclick uses the remove cart function to remove items */}
                </div>
                <hr/>
              </div>
              )
            }
        })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={()=>navigate('/order')} >checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart