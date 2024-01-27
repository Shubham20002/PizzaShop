import React from 'react';
import {createBrowserRouter,RouterProvider,} from 'react-router-dom'
import Form from './components/form'
import Mainpage from './components/mainpage';
import Navbar from './components/navbar';


export default function App() {
  const router=createBrowserRouter([
    {path:'/',element:<Navbar/>,children:[
      {path:'',element:<Mainpage/>},
      {path:'/order',element:<Form/>},

    ]}
  ])
  return (
   <>
   <RouterProvider router={router}/>
   </>
    
  )
}
