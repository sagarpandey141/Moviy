import { Routes,Route } from "react-router-dom"
import MoviePage from "./pages/MoviePage"
import DetailPage from "./components/DetailPage/DetailPage"
import { TVshow } from "./pages/TVshow"
import Home from "./pages/Home"
import HomePage from "./pages/HomePage"
import { useState } from "react"
import SearchPage from "./pages/SearchPage"
import Error from "./components/Error"

function App() {
  const [searchWord,setSearchWord] = useState("");
  return (
    <>
    <Routes>
         <Route path="/" element={<Home />}>
         <Route index element={<HomePage searchWord={searchWord} setSearchWord={setSearchWord} />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/movie/:movieId" element={<DetailPage/>}/>
            <Route path="/tvshow" element={<TVshow/>}/>
            <Route path={`search/${searchWord}`} element={<SearchPage/>} />
           
         </Route>
         <Route path="*" element={<Error /> } />
    </Routes>
    </>
  )
}

export default App
