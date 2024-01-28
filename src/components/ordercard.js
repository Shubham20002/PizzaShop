import { useEffect, useState } from "react";

export default function Ordercard(order){
    // const [stagetime,setStagetime]=useState({m:"",s:""});
    const [totaltime,setTotaltime]=useState({m:"",s:""});
    const {orderno,id,createdAt,updatedAt}=order.orderdetails;

    useEffect(()=>{
        //totaltime
        const currenttime = new Date().getTime();
        const ordertime=(currenttime/1000)-createdAt.seconds;
        let minutes = Math.floor(ordertime / 60);
        let extraSeconds = Math.floor(ordertime % 60);
        setTotaltime({m:minutes,s:extraSeconds});
    }
    )
    
    
    


    return(
        <>
        <div style={{width:"80%",border:"2px solid yellow",margin:"auto", marginTop:"10px",alignItems:"center"}}>
            
            <p>order no:{orderno}</p>
        
        <p>{totaltime.m}:{totaltime.s}</p>
            <button onClick={()=>{order.handlenext(id)}}>Next</button>

        </div>
        </>
    )
}