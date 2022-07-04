import React from 'react'
import WithdrawCSS from './Withdraw.module.css'
// @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap");
// import url from 'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap'



const Withdraw = () => {
  return (
          <div className={WithdrawCSS.box}> 
        <button className={WithdrawCSS.withdrawbtn}>WITHDRAW</button>
           </div>
        
      
  )
}

export default Withdraw