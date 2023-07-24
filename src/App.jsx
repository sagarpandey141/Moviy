import { Routes,Route } from "react-router-dom"
import MoviePage from "./pages/MoviePage"
import Testing from "./components/Testing"
import { Route ,Routes} from "react-router-dom"

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
