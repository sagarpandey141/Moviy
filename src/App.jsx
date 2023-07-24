import { Routes,Route } from "react-router-dom"
import MoviePage from "./pages/MoviePage"
import Testing from "./components/Testing"

function App() {
  return (
    <>
      <Routes className=''>
        <Route path="/movies" element={<MoviePage />} />
      </Routes>
    </>
  )
}

export default App
