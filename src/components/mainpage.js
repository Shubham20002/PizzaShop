import React, { useEffect } from 'react';
import { useState } from 'react';
import { collection, onSnapshot,doc,updateDoc,getDoc} from "firebase/firestore";
import { db } from '../firebaseinit';
import Ordercard from './ordercard';
import { serverTimestamp } from 'firebase/firestore'
import Details from './details';

export default function Mainpage() {
    const [orders,setOrders]=useState([]);

    useEffect(()=>{
        onSnapshot(collection(db,"pizzashop"), (snapshot) => {
       
            const orders =snapshot.docs.map((doc) => {
             return {id:doc.id,
              ...doc.data()}
            }) 
           setOrders(orders);
           console.log("orders",orders);
         })
},[]);
 async function handlenext(orderid){
    const updated_at_timestamp = new Date().getTime()
   console.log("updated_at_timestamp",updated_at_timestamp)
   //fetting ordet which we are going to update
   const docRef = doc(db, "pizzashop", orderid);
   const docSnap = await getDoc(docRef);
  

  //updating order stage
    const washingtonRef = doc(db, "pizzashop", orderid);
     await updateDoc(washingtonRef, {
    orderstage:docSnap.data().orderstage+1,
    updatedAt: updated_at_timestamp
    
        });
};

 //seprated order based on there stage
   const orderplaced=orders.filter((order)=>{
    if(order.orderstage==1){
        return order;
    }
   })
   console.log("placed",orderplaced);
   const ordermaking=orders.filter((order)=>{
    if(order.orderstage==2){
        return order;
    }
   })
   console.log("making",ordermaking);
   const orderready=orders.filter((order)=>{
    if(order.orderstage==3){
        return order;
    }
   })
   const orderpicked=orders.filter((order)=>{
    if(order.orderstage==4){
        return order;
    }
   })
   
    
  return (
    <>
    <div style={{width:"80%",border:"2px solid red", height:"auto",margin:"auto",display:'flex', justifyContent:"space-between"}}>
       {/* order placed section */}
        <div className="orderplaced" style={{width:"20%",border:"2px solid black" }}>
            <h3 style={{textAlign:"center"}}>Order Placed</h3>
            {orderplaced.map((order)=>(
                <Ordercard orderdetails={order} handlenext={handlenext}/>
            ))}
        </div>
      {/* oderder making section */}
        <div className="ordermaking" style={{width:"20%",border:"2px solid black" }}>
        <h3 style={{textAlign:"center"}}>Order making</h3>
            {ordermaking.map((order)=>(
                <Ordercard orderdetails={order} handlenext={handlenext}/>
            ))}
        </div>
        {/* order ready section */}
        <div className="orderready" style={{width:"20%",border:"2px solid black" }}>
        <h3 style={{textAlign:"center"}}>Order Ready</h3>
        {orderready.map((order)=>(
                <Ordercard orderdetails={order} handlenext={handlenext}/>
            ))}
        </div>

        {/* order picked section */}
        <div className="orderpicked" style={{width:"20%",border:"2px solid black" }}>
        <h3 style={{textAlign:"center"}}>Order Picked</h3>
        {orderpicked.map((order)=>(
                <Ordercard orderdetails={order} handlenext={handlenext}/>
            ))}
        </div>
    </div>
      <Details order={orders}/>

    </>
  )
}
