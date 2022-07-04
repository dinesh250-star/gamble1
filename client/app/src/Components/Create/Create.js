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
        <label htmlFor="eth"> 
                 <input type="radio" id="c1" name="coin"  />
                               
                  <img src={eth} alt="" className={CreateCSS.eth}/>
                  </label>
              </div>

            
              <div  className={CreateCSS.box3}>

<label htmlFor="btc"/>
                 <input type="radio" id="c2" name="coin"  />
                 
              
                 <img src={btc} alt="" className={CreateCSS.btc} />

                

              </div>
</div>
         
           <div className={CreateCSS.input}>
   
               <button> </button>
               <input type="number" id={CreateCSS.amount} placeholder="Enter amount"></input>
 
            </div>
                <input className={CreateCSS.btn} type="button" value="Create" />
                  </div>
                  </form>
         </div>
    
    
    
    
    
    </div>
  )
  }

export default Create