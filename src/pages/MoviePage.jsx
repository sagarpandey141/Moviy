import React, { useEffect } from 'react'
import { apiConnector } from '../sevices/axios'
import { movieUrls } from '../sevices/urls'
import Card from '../components/Card'
import { Loader } from '../components/Loader'
import Genre from "../RawData/Genre.json"
import CustomSelect from '../components/CustomSelect'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setResults, setPageIncrement, resetPageAndResults } from '../Redux/Slices/movieSlice'

const MoviePage = () => {
  // const [results, setresults] = useState([]);
  const { results, page, loading} = useSelector(state => state.movie);
  const {selectedGenre,sortBy}  = useSelector(state => state.genre);
  const dispatch = useDispatch();

  async function CallMoviesPageAPI() {
    dispatch(setLoading(true));
    try {
      let response;
      if (selectedGenre?.length > 0) {
        response = await apiConnector("GET", movieUrls.TRENDING_MOVIES_IN_DAY, `?page=${page}${sortBy != "" && "&sort_by=" + sortBy}&with_genres=${selectedGenre.map((value, index) =>
          (index < selectedGenre.length) ? value.id : "," + value.id
        )}`);
      }
      else {
        response = await apiConnector("GET", movieUrls.TRENDING_MOVIES_IN_DAY, `?page=${page}${sortBy != "" ? "&sort_by="+sortBy :"" }`);
      }
      console.log("main", response)
      dispatch(setResults(response.data.results));
      dispatch(setLoading(false));

    } catch (error) {
      console.log("Hi an error is occured", error)
      dispatch(setLoading(false));
    }
  }
  const isAtbottom = async () => {
    try {
      if (document.documentElement.scrollTop + window.innerHeight + 10 > document.documentElement.scrollHeight)
        dispatch(setPageIncrement());
    } catch (error) {
      console.log(error, "scroll error")
    }
  }

  useEffect(() => {
    CallMoviesPageAPI()
  }, [page,selectedGenre])

  useEffect(() => {
    window.addEventListener("scroll",isAtbottom)
    return () => window.removeEventListener("scroll",  isAtbottom)
  }, []);

  return (
    <div className='bg-slate-900 min-h-screen' >
      <div className='max-w-7xl mx-auto w-11/12'>
        <div className="flex justify-between flex-wrap py-5 flex-col md:flex-row md:items-center">
          <div className='text-2xl text-white'>Explore Movies</div>
          {/* select custom */}
          <div className='flex gap-2 flex-col md:flex-row'>
            <CustomSelect Genre={Genre} />
            
          </div>
        </div>

        {results.length > 0 &&
          <div className='grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4 '>{results.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
          </div>
        }
        {loading && <Loader />}
      </div>
    </div>
  )
}

export default MoviePage