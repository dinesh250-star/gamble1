import React from 'react'
import NavbarCSS from './Navbar.module.css'
import Login from '../Login/Login'
import Deposit from '../Deposit/Deposit'
import Withdraw from '../Withdraw/Withdraw'

const Navbar = () => {
  return (
    <nav>
        <div className={NavbarCSS.navbar}>
        <img src="" alt="" />
        <h1>GAMBLU</h1>    
        
        <ul>
            <li><Deposit/></li>
            <li><Withdraw/></li>
            </ul>
            <Login/>
</div>
    </nav>
  )
}

export default Navbar