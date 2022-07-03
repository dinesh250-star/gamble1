import React from 'react'
import CreateCSS from './Create.module.css'
import Navbar from '../Navbar/Navbar'
import eth from './eth.png'
import btc from './btc.png'

const Create = () => {
  return (
    
    <div>
        <div className={CreateCSS.box}>
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
         
           <form className={CreateCSS.input}>
   
               <label for="amount">Enter Amount</label>
               <input type="text" id="amount" name="amount"></input>
               <input type="button" value="+5" />
 
            </form>
                <input className={CreateCSS.btn} type="button" value="Create" />
                  </div>
         </div>
    
    
    
    
    
    </div>
  )
}

export default Create