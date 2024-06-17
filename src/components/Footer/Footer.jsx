import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
                <img className='footer-logo' src={assets.henlogo} alt=""/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, ad, doloribus ipsam magnam autem iste aliquam minima asperiores quasi inventore rem laborum! Non aliquam assumenda quas esse recusandae veniam eum.</p>
                <div className="footer-social-icons">
                    
                </div>
        </div>
        <div className="footer-content-center">
                <h2>COMPANY INFORMATION</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                    
                </ul>
        </div>
        <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>083 477 5562</li>
                    <li>dummyacc@gmail.com</li>
                </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">Copyright 2024 @ gbcchicken.com - All Rights Reserved</p>
    </div>
  )
}

export default Footer
