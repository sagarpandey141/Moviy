import MoviePage from "./pages/MoviePage"
import Testing from "./components/Testing"
import { Route ,Routes} from "react-router-dom"

function App() {
 
  return (
   <>
      <div className=''>
        <MoviePage />
      </div>

      {/*testing*/}
      <Routes>
      <Route path="/movie/:movieId" element={<Testing/>}/>
      </Routes>
    </>
  )
}

export default App
