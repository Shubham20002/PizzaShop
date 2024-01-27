import React from 'react';
import { NavLink,Outlet } from "react-router-dom"

export default function Navbar() {
  return (
    <>
    <div>
    <NavLink to="/" style={({isActive})=>isActive ? {color:"red"}:undefined}>Home</NavLink>
    <NavLink to="/order" style={({isActive})=>isActive ? {color:"red"}:undefined}>Order</NavLink>
    <Outlet/>
    </div>
    </>
  )
}
