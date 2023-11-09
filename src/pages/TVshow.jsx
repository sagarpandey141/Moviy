import React, { useEffect, useState } from "react";
import { apiConnector } from "../sevices/axios";
import { tvUrls } from "../sevices/urls_t";
import Card from "../components/Card/Card";
import { Loader } from "../components/Loader/Loader";
import genre_t from "../RawData/genre_t.json";
import CustomSelectTv from "../components/TvGenre/TvCustomSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setResults,
  setPageIncrement,
} from "../Redux/Slices/TvSlice";
import Select from "../components/Select";
import sortOptions from "../RawData/sorting_t.json";
import axios from "axios";
// import { isAtBottom } from "../utils/functions";

const TVshow = () => {
  const { results, page, loading } = useSelector((state) => state.tv);
  const { selectedGenre, sortBy } = useSelector((state) => state.Tvgenre);
  const dispatch = useDispatch();

  async function CallTvPageAPI(page, genres, sortby) {
    dispatch(setLoading(true));
    try {
      let response;
      if (selectedGenre?.length > 0) {
        response = await apiConnector(
          "GET",
          tvUrls.DISCOVER_TV,
          `?page=${page}${
            sortby != "" ? "&sort_by=" + sortby : ""
          }&with_genres=${genres.map((value, index) =>
            index < genres.length ? value.id : "," + value.id
          )}`
        );
        console.log("first",response);
      } else {
        response = await apiConnector(
          "GET",
          "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc"
        );
      }
      console.log("main", response);
      // response after filter
      dispatch(setResults(response.data.results));
      dispatch(setLoading(false));
    } catch (error) {
      console.log("Hi an error is occured", error);
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    CallTvPageAPI(page, selectedGenre, sortBy);
  }, [page, selectedGenre, sortBy]);

  function isAtBottom() {
    if (
      (document.documentElement.scrollTop + window.innerHeight + 10) >
      document.documentElement.scrollHeight
    )
    return true;
    else 
    return false;
  }

  function handleScrollEvent() {
    if (isAtBottom()) {
      console.log("Hello");
      dispatch(setPageIncrement());
    }
    console.log("Hello");
  }
 useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  },[]); 

  return (
    <div className='bg-[#08172f] py-14' >
      {loading ? (<Loader />)
      : (
          <div className='max-w-6xl mx-auto w-11/12 '>
          <div className="flex justify-between flex-wrap py-5 flex-col md:flex-row md:items-center">
            <div className="text-xl text-white ">Explore TV Show</div>
            {/* select custom */}
            <div className="flex gap-2 flex-col md:flex-row text-white pt-4">
              <CustomSelectTv Genre={genre_t} />
              <Select placeHolder={"Sort By"} options={sortOptions} />
            </div>
          </div>

          {results.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4 ">
              {results.map((tv, index) => (
                <Card key={index} movie={tv} />
              ))}
            </div>
          )}
        
        </div>
      )}
      
    </div>
  );
};

export default TVshow;



