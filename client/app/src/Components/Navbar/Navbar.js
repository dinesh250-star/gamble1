import React from 'react'
import NavbarCSS from './Navbar.module.css'
import Login from '../Login/Login'

const Navbar = () => {
  return (
    <nav>
        <div className={NavbarCSS.navbar}>
        <img src="" alt="" />
        <h1>GAMBLU</h1>    
        
        <ul>
            <li>Home</li>
            <li>Return</li>
            </ul>
            <Login/>
</div>
    </nav>
  )
}

export default Navbar