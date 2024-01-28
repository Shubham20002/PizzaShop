
export default function Ordercard(order){
    const {orderno,id}=order.orderdetails;
    console.log(order);

    return(
        <>
        <div style={{width:"80%",border:"2px solid yellow",margin:"auto", marginTop:"10px",alignItems:"center"}}>
            
            <p>order no:{orderno}</p>
            <button onClick={()=>{order.handlenext(id)}}>Next</button>

        </div>
        </>
    )
}