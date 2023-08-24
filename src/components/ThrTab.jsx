import React, { useEffect, useState } from "react";
import { apiConnector } from "../sevices/axios";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
const ThrTab = () => {
  const [days, setDays] = useState([]);
  const [week, setWeek] = useState([]);
  const [PopularMovie, setPopularMovie] = useState([]);
  const [PopularTvShow, setPopularTvShow] = useState([]);
  const [currentClick, setCurrentClick] = useState("days");
  const [currentClickWhat, setCurrentClickWhat] = useState("movie");
  const navigate = useNavigate();
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  async function fetchMovieDay() {
    const response = await apiConnector(
      "GET",
      BASE_URL + "/trending/movie/day?language=en-US"
    );
    if (response) {
      setDays(response?.data?.results);
    }
  }

  async function fetchMovieBaseOnWeek() {
    const response = await apiConnector(
      "GET",
      BASE_URL + "/trending/movie/week?language=en-US"
    );
    if (response) {
      setWeek(response?.data?.results);
    }
  }

  async function fetchPopularMovie() {
    const response = await apiConnector(
      "GET",
      BASE_URL + "/movie/popular?language=en-US&page=1"
    );
    if (response) {
      setPopularMovie(response?.data?.results);
    }
  }

  async function fetchPopularTvShow() {
    const response = await apiConnector(
      "GET",
      BASE_URL + "/tv/popular?language=en-US&page=1"
    );
    console.log("res", response);
    if (response) {
      setPopularTvShow(response?.data?.results);
    }
  }

  useEffect(() => {
    fetchMovieDay();
    fetchMovieBaseOnWeek();
    fetchPopularMovie();
    fetchPopularTvShow();
  }, []);

  // console.log("popular move", PopularMovie);
  return (
    <div className="max-w-4xl w-11/12 mx-auto text-white py-5">
      {/*trending*/}

      <div className="">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">Trending</h1>
          <div className="flex bg-white  cursor-pointer text-black rounded-full px-3 items-center gap-3">
            <div
              className={`${
                currentClick === "days" ? " text-orange-500" : " text-black "
              }`}
              onClick={() => setCurrentClick("days")}
            >
              Day
            </div>
            <div
              className={`${
                currentClick === "months" ? "  text-orange-500" : " text-black "
              }`}
              onClick={() => setCurrentClick("months")}
            >
              Week
            </div>
          </div>
        </div>

        {currentClick === "days" ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4">
            {days?.slice(0, 5)?.map((data, index) => (
              <Card movie={data} key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4 ">
            {week?.slice(0, 5)?.map((data, index) => (
              <Card movie={data} key={index} />
            ))}
          </div>
        )}
      </div>

      {/*what popular*/}

      <div className="mt-10">
        <div className="">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">What's Popular</h1>
            <div className=" flex gap-3 bg-white cursor-pointer text-black rounded-full px-3 items-center">
              <div
                className={`${
                  currentClickWhat === "movie"
                    ? " text-orange-500"
                    : " text-black "
                }`}
                onClick={() => setCurrentClickWhat("movie")}
              >
                Movie
              </div>
              <div
                className={`${
                  currentClickWhat === "tvshow"
                    ? "text-orange-500"
                    : "text-black "
                }`}
                onClick={() => setCurrentClickWhat("tvshow")}
              >
                TvShow
              </div>
            </div>
          </div>
        </div>

        {/*card*/}
       
          {currentClickWhat === "movie" ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4 ">
              {PopularMovie.slice(0, 5).map((data, index) => (
                <Card movie={data} key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4 ">
              {PopularTvShow.slice(0, 5).map((data, index) => (
                <Card movie={data} key={index}/>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};
export default ThrTab;
