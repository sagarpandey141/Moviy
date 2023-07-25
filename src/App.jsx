import { Routes,Route } from "react-router-dom"
import MoviePage from "./pages/MoviePage"
import Testing from "./components/Testing"

function App() {
  return (
    <>
      <p>hii</p>
      <Routes className=''>
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/movie/:movieId" element={<Testing/>}/>
        

      </Routes>
    </>
  )
}

export default App
