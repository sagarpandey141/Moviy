import { Routes,Route } from "react-router-dom"
import MoviePage from "./pages/MoviePage"
import Testing from "./components/Testing"
import { TVshow } from "./pages/TVshow"
import Home from "./pages/Home"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}>
       {/* <Route index element={name the home page outlet element first page where } /> */}
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/movie/:movieId" element={<Testing/>}/>
            <Route path="/tvshow" element={<TVshow/>}/>
         </Route>
    </Routes>
    </>
  )
}

export default App
