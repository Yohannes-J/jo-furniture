import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
            <img src={assets.logo}alt=''/>
                <p>This page is furniture producs are listed and anyone can access simply </p>
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon}alt=''/>
                    <img src={assets.twitter_icon}alt=''/>
                    <img src={assets.linkedin_icon}alt=''/>
                </div>

            </div>
            <div className='footer-content-center'>
<h2> Work Place</h2>
<ul>
    <li>Home</li>
    <li>About us</li>
    <li>Delivery</li>
    <li>Privacy Policy</li>
</ul>
            </div>
            <div className='footer-content-right'>
<h2> GET IN TOUCH </h2>
<ul>
    <li>+251-943-82-56-49</li>
    <li>mebra5649@gmail.com</li>
  <li>1000565188244</li>
</ul>
            </div>
        </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2024 mebafurn@gmai.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
