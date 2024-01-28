import { useEffect, useState, } from "react";
import {db} from '../firebaseinit';
import { useNavigate } from "react-router-dom";
import { collection, addDoc,getCountFromServer } from "firebase/firestore"; 
import { serverTimestamp } from 'firebase/firestore'

export default function Form(){
    //to store perticular order
      const [orderdata,setOrderdata]=useState({type:"",size:"",base:""});
      // tostore all orders
    //   const [orders,setOrders]=useState([]);
      const navigate = useNavigate();

      
      async function handleSubmit(e){
        e.preventDefault();
        // console.log("data submited")
        // setOrders([orderdata,...orders])
       //getting no of orders present in db
        const coll = collection(db, "pizzashop");
        const snapshot = await getCountFromServer(coll);
        // console.log('count: ', snapshot.data().count);
        const updated_at_timestamp = new Date().getTime()
        
        const docRef = await addDoc(collection(db, "pizzashop"), {
            type:orderdata.type,
            size:orderdata.size,
            base:orderdata.base,
            orderno:snapshot.data().count+1,
            orderstage:1,
            createdAt: updated_at_timestamp,
            updatedAt: updated_at_timestamp
          });
          console.log("Document written with ID: ", docRef.id);
          setOrderdata({type:"",size:"",base:""})
        // console.log(orders);
        
        setTimeout(() => {
            navigate('/');
        }, 1000);
    }

    
    return(
        <>
        <div style={{marginLeft:"auto",display: 'flex',
                    alignItems: 'center',justifyContent: 'center',marginTop:"20px"}}>
        <form action="" onSubmit={handleSubmit} style={{border:"2px solid black ",padding:"25px", width:"500px"}} >
            {/* type of pizza */}
            <h2 style={{textAlign:"center",color:"red"}}>Place order</h2>
            <h5 style={{textAlign:"center"}}>Type</h5>
        <input type="radio" id="type" name="type" value="veg" onChange={(e)=>
         setOrderdata({type:e.target.value,size:orderdata.size,base:orderdata.base})} />
        <label for="html">Veg</label>
        &nbsp;&nbsp;&nbsp;

        <input type="radio" id="type" name="type"  value="non-veg"  onChange={(e)=>
                                    setOrderdata({type:e.target.value,size:orderdata.size,base:orderdata.base})} />
        <label for="css">Non-Veg</label><br/>
          {/*size of pizza  */}
        <h5 style={{textAlign:"center"}}>Size</h5>
        <input type="radio" id="size" name="size" value="small"  onChange={(e)=>
                                    setOrderdata({type:orderdata.type,size:e.target.value,base:orderdata.base})}/>
        <label for="html">Small</label>
        &nbsp;&nbsp;&nbsp;
        <input type="radio" id="size" name="size"  value="medium" onChange={(e)=>
                                    setOrderdata({type:orderdata.type,size:e.target.value,base:orderdata.base})}/>
        <label for="css">Medium</label>
        &nbsp;&nbsp;&nbsp;
        <input type="radio" id="size" name="size"  value="large" onChange={(e)=>
                                    setOrderdata({type:orderdata.type,size:e.target.value,base:orderdata.base})}/>
        <label for="css">Large</label>
        <br/>
         {/* base size */}
        <h5 style={{textAlign:"center"}}>Base</h5>
        <input type="radio" id="base" name="base" value="thin" onChange={(e)=>
                                    setOrderdata({type:orderdata.type,size:orderdata.size,base:e.target.value})}/>
        <label for="html">Thin</label>
        &nbsp;&nbsp;&nbsp;
        <input type="radio" id="base" name="base" value="thick" onChange={(e)=>
                                    setOrderdata({type:orderdata.type,size:orderdata.size,base:e.target.value})}/>
        <label for="html">Thick</label>
        <br/>

        <button style={{marginLeft:"165px"}}>Place order</button>
        {/* <p>you have selected {orderdata.size} size {orderdata.type} pizza with {orderdata.base} base</p> */}
      
        </form>
        </div>
        </>
    )
}