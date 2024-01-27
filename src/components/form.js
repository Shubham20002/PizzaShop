import { useEffect, useState } from "react";
import {db} from '../firebaseinit';
import { collection, addDoc } from "firebase/firestore"; 

export default function Form(){
    //to store perticular order
      const [orderdata,setOrderdata]=useState({type:"",size:"",base:""});
      // tostore all orders
      const [orders,setOrders]=useState([]);
     

      
      async function handleSubmit(e){
        e.preventDefault();
        // console.log("data submited")
        setOrders([orderdata,...orders])
        
        const docRef = await addDoc(collection(db, "pizzashop"), {
            type:orderdata.type,
            size:orderdata.size,
            base:orderdata.base
          });
          console.log("Document written with ID: ", docRef.id);
          setOrderdata({type:"",size:"",base:""})
        // console.log(orders);
    }

    
    return(
        <>
        <div>
        <form action="" onSubmit={handleSubmit} >
            {/* type of pizza */}
            <h1>Type</h1>
        <input type="radio" id="type" name="type" value="veg" onChange={(e)=>
         setOrderdata({type:e.target.value,size:orderdata.size,base:orderdata.base})} />
        <label for="html">Veg</label>

        <input type="radio" id="type" name="type"  value="non-veg"  onChange={(e)=>
                                    setOrderdata({type:e.target.value,size:orderdata.size,base:orderdata.base})} />
        <label for="css">Non-Veg</label><br/>
          {/*size of pizza  */}
        <h1>Size</h1>
        <input type="radio" id="size" name="size" value="small"  onChange={(e)=>
                                    setOrderdata({type:orderdata.type,size:e.target.value,base:orderdata.base})}/>
        <label for="html">Small</label>
        <input type="radio" id="size" name="size"  value="medium" onChange={(e)=>
                                    setOrderdata({type:orderdata.type,size:e.target.value,base:orderdata.base})}/>
        <label for="css">Medium</label>
        <input type="radio" id="size" name="size"  value="large" onChange={(e)=>
                                    setOrderdata({type:orderdata.type,size:e.target.value,base:orderdata.base})}/>
        <label for="css">Large</label>
        <br/>
         {/* base size */}
        <h1>Base</h1>
        <input type="radio" id="base" name="base" value="thin" onChange={(e)=>
                                    setOrderdata({type:orderdata.type,size:orderdata.size,base:e.target.value})}/>
        <label for="html">Thin</label>
        <input type="radio" id="base" name="base" value="thick" onChange={(e)=>
                                    setOrderdata({type:orderdata.type,size:orderdata.size,base:e.target.value})}/>
        <label for="html">Thick</label>
        <br/>

        <button>Place order</button>
        <h1>you have selected {orderdata.size} size {orderdata.type} pizza with {orderdata.base} base</h1>
      
        </form>
        </div>
        </>
    )
}