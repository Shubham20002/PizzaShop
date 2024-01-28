import React, { useEffect } from 'react';
import { useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebaseinit';

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
    <div>
       
        
        <div className="ordermaking"></div>
        <div className="orderready"></div>
        <div className="orderpicked"></div>
    </div>
  )
}
