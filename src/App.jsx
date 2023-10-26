import { Routes,Route, useLocation } from "react-router-dom"
import MoviePage from "./pages/MoviePage"
import DetailPage from "./components/DetailPage/DetailPage"
import  TVshow  from "./pages/TVshow"
import Home from "./pages/Home"
import HomePage from "./pages/HomePage"
import { useState } from "react"
import SearchPage from "./pages/SearchPage"
import Error from "./components/Error"
import { useEffect } from "react"

function App() {
  

  const {pathname} = useLocation();
  
  function ScroolTop () {
    useEffect(() => {
      window.scroll({
        top:0,
        left:0
       })
    },[pathname]); 
  };

  return (
    <div className="">
    <ScroolTop />
    <Routes>
         <Route path="/" element={<Home />}>
         <Route index element={<HomePage />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/movie/:movieId" element={<DetailPage/>}/>
            <Route path="/tvshow" element={<TVshow/>}/>
            <Route path={`/search/:searchName`} element={<SearchPage />} />
         </Route>
         <Route path="*" element={<Error /> } />
    </Routes>
    </div>
  )
}

export default App
