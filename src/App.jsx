import { Routes,Route } from "react-router-dom"
import MoviePage from "./pages/MoviePage"
import Testing from "./components/Testing"
<<<<<<< HEAD
import { TVshow } from "./pages/TVshow"
=======
import Home from "./pages/Home"
>>>>>>> db675cd564b7eec690b99f4fa8d57f21186fde84

function App() {
  return (
    <>
<<<<<<< HEAD
      <Routes className=''>
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/movie/:movieId" element={<Testing/>}/>
        <Route path="/tvshow" element={<TVshow/>}/>
      </Routes>
=======
    <Routes>
      <Route path="/" element={<Home />}>
       {/* <Route index element={name the home page outlet element} /> */}
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/movie/:movieId" element={<Testing/>}/>
         </Route>
    </Routes>
>>>>>>> db675cd564b7eec690b99f4fa8d57f21186fde84
    </>
  )
}

export default App
