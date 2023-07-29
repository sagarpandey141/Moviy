import { Routes,Route } from "react-router-dom"
import MoviePage from "./pages/MoviePage"
import Testing from "./components/Testing"
import { TVshow } from "./pages/TVshow"

function App() {
  return (
    <>
      <Routes className=''>
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/movie/:movieId" element={<Testing/>}/>
        <Route path="/tvshow" element={<TVshow/>}/>
      </Routes>
    </>
  )
}

export default App
