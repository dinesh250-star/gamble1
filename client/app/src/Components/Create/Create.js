import React from 'react'
import CreateCSS from './Create.module.css'
import Navbar from '../Navbar/Navbar'
import eth from './eth.png'
import btc from './btc.png'

const Create = () => {
  return (
    
    <div>
        <div className={CreateCSS.box}>
          <form >

             <div className={CreateCSS.box1}>

<div className={CreateCSS.box2}>

     <div className={CreateCSS.box3}>
                 <input type="checkbox" id="c1" name="coin" />
                 <label htmlFor="eth">                
                  <img src={eth} alt="" className={CreateCSS.eth}/>
                  </label>
              </div>

            
              <div  className={CreateCSS.box3}>


                 <input type="checkbox" id="c2" name="coin" />
                 <label htmlFor="btc">

                 <img src={btc} alt="" className={CreateCSS.btc} />

                 </label>

              </div>
</div>
         
           <div className={CreateCSS.input}>
   
               <label for="amount">Enter Amount</label>
               <input type="text" id="amount" name="amount"></input>
               <input type="button" value="+5" />
 
            </div>
                <input className={CreateCSS.btn} type="button" value="Create" />
                  </div></form>
         </div>
    
    
    
    
    
    </div>
  )
}

export default Create