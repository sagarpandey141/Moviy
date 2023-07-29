import { Routes,Route } from "react-router-dom"
import MoviePage from "./pages/MoviePage"
import Testing from "./components/Testing"
import Home from "./pages/Home"

function App() {
  return (
    <>
    <Routes>
         {/* <p>hii</p> */}
      <Route path="/" element={<Home />}>
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/movie/:movieId" element={<Testing/>}/>
         </Route>
    </Routes>
    </>
  )
}

export default App
