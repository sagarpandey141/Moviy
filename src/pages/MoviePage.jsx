import React, { useEffect,useState } from 'react'
import { apiConnector } from '../sevices/axios'
import { movieUrls } from '../sevices/urls'
import Card from '../components/Card'
import { Loader } from '../components/Loader'
import Genre from "../RawData/Genre.json"
import CustomSelect from '../components/CustomSelect'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setResults, setPageIncrement, resetPageAndResults } from '../Redux/Slices/movieSlice'
import Select from '../components/Select'
import sortOptions from "../RawData/sorting.json"



const MoviePage = () => {
  const { results, page, loading} = useSelector(state => state.movie);
  const {selectedGenre,sortBy}  = useSelector(state => state.genre);
  const dispatch = useDispatch();

  async function CallMoviesPageAPI(page,genres,sortby) {
    dispatch(setLoading(true));
    try {
      let response;
      if (selectedGenre?.length > 0) {
        response = await apiConnector("GET", movieUrls.DISCOVER_MOVIE, `?page=${page}${sortby != "" ? "&sort_by="+sortby : ""}&with_genres=${genres.map((value, index) =>
          (index < genres.length) ? value.id : "," + value.id
        )}`);
      }
      else {
        response = await apiConnector("GET", movieUrls.DISCOVER_MOVIE, `?page=${page}${sortby != "" ? "&sort_by="+sortby : "" }`);
      }
      console.log("main", response)
      // response after filter 
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
    CallMoviesPageAPI(page,selectedGenre,sortBy)
  }, [page,selectedGenre,sortBy])

  useEffect(() => {
    window.addEventListener("scroll",isAtbottom)
    return () => window.removeEventListener("scroll",  isAtbottom)
  }, []);
  return (
    <div className='bg-[#08172f]' >
      <div className='max-w-4xl mx-auto w-11/12 '>
        <div className="flex justify-between flex-wrap py-5 flex-col md:flex-row md:items-center">
          <div className='text-2xl text-white '>Explore Movies</div>
          {/* select custom */}
          <div className='flex gap-2 flex-col md:flex-row  text-white'>
             <CustomSelect Genre={Genre}  />
             <Select placeHolder={"Sort By"} options={sortOptions} /> 
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