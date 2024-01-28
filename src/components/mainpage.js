import React, { useEffect } from 'react';
import { useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebaseinit';
import Ordercard from './ordercard';

export default function Mainpage() {
    const [orders,setOrders]=useState([]);
    useEffect(()=>{
        onSnapshot(collection(db,"pizzashop"), (snapshot) => {
       
            const orders =snapshot.docs.map((doc) => {
             return {id:doc.id,
              ...doc.data()}
            }) 
           setOrders(orders);
           console.log(orders);
         })
},[]);
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
    <div style={{width:"80%",border:"2px solid red", height:"300px",margin:"auto",display:'flex', justifyContent:"space-between"}}>
       {/* order placed section */}
        <div className="orderplaced" style={{width:"20%",border:"2px solid black" }}>
            <h3 style={{textAlign:"center"}}>Order Placed</h3>
            {orderplaced.map((order)=>(
                <Ordercard orderdetails={order}/>
            ))}
        </div>
      {/* oderder making section */}
        <div className="ordermaking" style={{width:"20%",border:"2px solid black" }}>
        <h3 style={{textAlign:"center"}}>Order making</h3>
            {ordermaking.map((order)=>(
                <Ordercard orderdetails={order}/>
            ))}
        </div>
        {/* order ready section */}
        <div className="orderready" style={{width:"20%",border:"2px solid black" }}>
        <h3 style={{textAlign:"center"}}>Order Ready</h3>
        {orderready.map((order)=>(
                <Ordercard orderdetails={order}/>
            ))}
        </div>

        {/* order picked section */}
        <div className="orderpicked" style={{width:"20%",border:"2px solid black" }}>
        <h3 style={{textAlign:"center"}}>Order Picked</h3>
        {orderpicked.map((order)=>(
                <Ordercard orderdetails={order}/>
            ))}
        </div>
    </div>
  )
}
