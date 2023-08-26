import React from 'react'
import {Outlet} from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"

const Home = () => {
  return (
    <div className=' w-screen h-screen bg-[#08172f] '>
       <Header/>
        
        {/*3 tabs*/}
        <Outlet/>
       <Footer/>
    </div>
  )
}

export default Home