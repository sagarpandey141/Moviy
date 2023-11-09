import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../sevices/axios";
import Card from "../components/Card/Card";
import { isAtBottom } from "../utils/functions";
import CastProfile from "../components/CastProfile";

const SearchPage = () => {
  const [searchPage, setSearchPage] = useState(1);
  const [movieResults, setMovieResults] = useState([]);
  const [personResults, setPersonResults] = useState([]);
  const [TvResults, setTvResults] = useState([]);
  const [category, setCategory] = useState("Movie");
  const { searchName } = useParams();
  function handleClick(e) {
    setCategory(e.currentTarget.innerText);
  }
  async function callSearchApi() {
    try {
      let MovieArr = [],
        PersonArr = [],
        TvArr = [];
      const response = await apiConnector(
        "GET",
        import.meta.env.VITE_BASE_URL +
          "/search/multi?query=" +
          searchName +
          "&page=" +
          searchPage
      );
      console.log("search", response);
      response.data.results.forEach((data) => {
        if (data.media_type == "person") {
          PersonArr.push(data);
        } else if (data.media_type == "movie") {
          MovieArr.push(data);
        } else {
          TvArr.push(data);
        }
      });
      if (response.data.total_pages >= searchPage) {
        setMovieResults([...movieResults, ...MovieArr]);
        setPersonResults([...personResults, ...PersonArr]);
        setTvResults([...TvResults, ...TvArr]);
      } else {
        console.log("else");
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    callSearchApi();
  }, [searchPage]);

  function handleScrollEvent() {
    if(isAtBottom())
      setSearchPage((searchPage) => searchPage + 1);
  }

  useEffect(() => {
    window.addEventListener("scroll",handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent)
  }, []);

  return (
    <div className="bg-[#08172f] pt-20">
      <div className="max-w-4xl mx-auto w-11/12">
        <ul className="flex gap-3 justify-center font-semibold decoration-2 ">
          <li
            onClick={handleClick}
            className={
              category === "Movie"
                ? "text-orange-500 underline underline-offset-8 transition-underline decoration-orange-500 duration-100 "
                : "text-gray-500"
            }
          >
            Movie
          </li>
          <li
            onClick={handleClick}
            className={
              category === "Tv shows"
                ? "text-white underline underline-offset-8 transition-underline decoration-white   duration-100 "
                : "text-gray-500"
            }
          >
            Tv shows
          </li>
          <li
            onClick={handleClick}
            className={
              category === "People"
                ? "text-green-500 underline underline-offset-8 transition-underline duration-100 decoration-green-500 "
                : "text-gray-500"
            }
          >
            People
          </li>
        </ul>

        <div className="italic text-2xl text-gray-400">
          Search results of {" "}
          <span className="capitalize not-italic decoration-sky-500 underline text-white underline-offset-8 ">
            {searchName}
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4 py-4">
          {category === "Movie"
            ? movieResults.map((movie, index) => (
                <Card movie={movie} key={index} />
              ))
            : category === "People"
            ? personResults.map((people, index) => (
                <CastProfile cast={people} key={index} />
              ))
            : TvResults.map((Tvshows, index) => (
                <Card movie={Tvshows} key={index} />
              ))}
        </div>
      </div>
    </div>
  )
};

export default SearchPage;
