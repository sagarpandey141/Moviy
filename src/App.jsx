import { Routes,Route } from "react-router-dom"
import MoviePage from "./pages/MoviePage"
import Testing from "./components/Testing"
import Home from "./pages/Home"

function App() {
  return (
    <>
    <Routes>
         <Route path="/" element={<Home />}>
            <Route path="/movies" element={<MoviePage />} />
         </Route>
    </Routes>
    </>
  )
}

export default App
