import React from 'react'
import {Outlet} from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useState,useEffect } from 'react'
const Home = () => {

  const[showFooter,setshowFooter]=useState(false);

  useEffect(()=>{
    const timeid=setTimeout(()=>{
       setshowFooter(true);
    },3000)

    return()=>{
        clearTimeout(timeid);
    }
},[])

  return (
    <div className='w-screen h-screen bg-[#08172f] '>
       <Header/>
       <Outlet/>
       {showFooter  && <Footer/>}
    </div>
  )
}

export default Home