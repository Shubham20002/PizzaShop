import React from 'react';
import {createBrowserRouter,RouterProvider,} from 'react-router-dom'
import Form from './components/form'
import Mainpage from './components/mainpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';


export default function App() {
  const router=createBrowserRouter([
    {path:'/',element:<Header/>,children:[
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
