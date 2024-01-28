import React, { useEffect, useState } from 'react';
import { db } from '../firebaseinit';
import { doc,updateDoc} from "firebase/firestore";

export default function Details(details) {
   
    console.log("order details",details.order);
    const undeliverdorders=details.order.filter((order)=>{
        if(order.orderstage!=5 && order.orderstage!=6){
            return order;
        }
    })
    //to calculating how many orders are deliverd
    const delivered=details.order.filter((order)=>{
        if(order.orderstage==5){
            return order;
        }
    })
    const totaldelivered=delivered.length;
    const currenttime = new Date().getTime();

   async function handlecancle(orderid){
           console.log(orderid);
           const washingtonRef = doc(db, "pizzashop", orderid);
     await updateDoc(washingtonRef, {
    orderstage:6
    
        });
    }
    
  return (
    <>

    <table >
        <p>Main section</p>
        <tr>
            <th>order no</th>
            <th>order stage</th>
            <th>total time</th>
            <th>action</th>
        </tr>
        {undeliverdorders.map((order)=>(
            
            <tr>
                <th>{order.orderno}</th>
                <th>{order.orderstage==1 ? "order placed":null ||
                order.orderstage==2 ? "order making":null ||
                order.orderstage==3 ? "order Ready":null ||
                order.orderstage==4 ? "order picked":null || 
                order.orderstage==5 ? "deliverd":null 
                }</th>
                <th>{Math.floor(((currenttime/1000)-(order.createdAt/1000))/60)}:
                {
                 Math.floor(((currenttime/1000)-(order.createdAt/1000))%60)
                }</th>
                <th>{order.orderstage==1 ? <button onClick={()=>{handlecancle(order.id)}}>cancle</button>:null ||
                order.orderstage==2 ? <button onClick={()=>{handlecancle(order.id)}}>cancle</button> :null
                }</th>
            </tr>
        ))}
        <tr>total no of order deliverd:{totaldelivered}</tr>
    </table>
    </>
  )
}


   
        
  