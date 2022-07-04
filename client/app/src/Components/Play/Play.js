import React from 'react'
import PlayCSS from './Play.module.css'
import btc from '../../Components/Create/btc.png'
import eth from '../../Components/Create/eth.png'

const Play = () => 
{
// const heads = 0;
// const tails = 0;
// const display = document.querySelector(".display");
// const flip = document.querySelector("#flip");
// const reset = document.querySelector("#reset");

// flip.addEventListener("click", () => {
//     const i = Math.floor(Math.random() * 2);
//     display.style.animation = "none";
//     if(i){
//         setTimeout(function(){
//             display.style.animation = "spin-heads 3s forwards";
//         }, 100);
//         heads++;
//     }
//     else{
//         setTimeout(function(){
//             display.style.animation = "spin-tails 3s forwards";
//         }, 100);
//         tails++;
//     }
//     setTimeout(updateStats, 3000);
//     disableButton();
// });




    return (


    <div className={PlayCSS.box}>
        
        <div className={PlayCSS.box1}>

            <div className={PlayCSS.count1}>
               <h1 className={PlayCSS.headscount}>HEADS :</h1>
               <h1 className={PlayCSS.tailscount}>TAILS :</h1>
            </div>

            <div className={PlayCSS.display} >
                <div > 
                <img src={btc} className={PlayCSS.heads} alt="" /></div>
               

                <div >
                    <img src={eth} alt="" className={PlayCSS.tails} />
</div>
                
            </div>

            <div className={PlayCSS.buttons}>
                <button id={PlayCSS.flip}></button>
                <button id={PlayCSS.reset} type="reset"></button>
            </div>
        </div>
    </div>
  )
}

export default Play