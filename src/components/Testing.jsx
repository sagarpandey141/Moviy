import React, { useEffect, useState } from "react";
import { apiConnector } from "../sevices/axios";
import { movieUrls } from "../sevices/urls";
import { Link, useParams } from "react-router-dom";
import Card from "./Card";
import { Loader } from "./Loader";

const Testing = () => {
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const { movieId } = useParams();
  const [MovieSpecificData, setMovieSpecificData] = useState(null);
  const [Cast, setCast] = useState([]);
  const [OfficialVideo, setOfficialVideo] = useState([]);
  const [SimilarVideo, setSimilar] = useState([]);
  const [Recommended, setRecommended] = useState([]);
  async function GetSpecificMovieData() {
    const response = await apiConnector(
      "GET",
      movieUrls.MOVIE_DETAIL + `${movieId}`
    );
    if (response) {
      setMovieSpecificData(response);
    }
  }

  async function GetCredit() {
    const response = await apiConnector(
      "GET",
      movieUrls.MOVIE_DETAIL + `${movieId}/credits`
    );
    if (response) {
      setCast(response?.data?.cast);
    }
  }



  async function getOfficialVideo() {
    const response = await apiConnector(
      "GET",
      movieUrls.MOVIE_DETAIL + `${movieId}/videos`
    );
    console.log("resp video", response);
    if (response) {
      setOfficialVideo(response?.data?.result);
    }
  }

  async function getSimilarVideo() {
    const response = await apiConnector(
      "GET",
      movieUrls.MOVIE_DETAIL + `${movieId}/similar`
    );
    console.log("similar", response);
    if (response) {
      setSimilar(response?.data?.results);
    }
  }

  async function RecommendadVideo() {
    const response = await apiConnector(
      "GET",
      movieUrls.MOVIE_DETAIL + `${movieId}/recommendations`
    );
    console.log("recomme", response);
    if (response) {
      setRecommended(response.data.results);
    }
  }
  useEffect(() => {
    GetSpecificMovieData();
    GetCredit();
    getOfficialVideo();
    getSimilarVideo();
    RecommendadVideo();
    // added because when you click on movie card ,inside a opened card then it does not go to top of webapp
    window.scrollTo({
      top:0,left:0,behavior:"smooth"
    });

  }, [movieId]);

  return (
    <div className="bg-[#08172f]">
      {/*section 1*/}
      {
         MovieSpecificData ? ( <div className="max-w-7xl mx-auto w-11/12 p-5">
        <div className="">
          {/*<img src={imageBaseUrl+"w400"+MovieSpecificData?.data?.backdrop_path}/>*/}

          <div className="flex gap-4  text-white">
            {/*left part*/}
            <img
              className="rounded-md" 
              src={imageBaseUrl + "w400" + MovieSpecificData?.data?.poster_path}
            />

            {/*right part*/}
            <div className="">
              <h2 className="text-4xl">
                {MovieSpecificData?.data?.belongs_to_collection?.name}
              </h2>
              <p className=" text-slate-600 italic mt-1 text-2xl">
                {MovieSpecificData?.data?.tagline}
              </p>
              {/*genres*/}
              {MovieSpecificData?.data?.genres?.map((index, data) => {
                return <p key={index}>{data?.name}</p>;
              })}
              {/*vote averge*/}
              <div className="flex rounded-full bg-slate-800 w-24 aspect-square items-center justify-center text-white">
                <p className=" text-3xl">
                  {MovieSpecificData?.data?.vote_average?.toFixed(2)}
                </p>
              </div>
              {/*overview*/}
              <div>
                <h2 className="text-3xl mt-3">OverView</h2>
                <p className="text-lg mt-2">
                  {MovieSpecificData?.data?.overview}
                </p>
              </div>
              {/*status released runtime */}
              <div className="flex gap-2 mt-7">
                <p className="">
                  Status:{" "}
                  <span className=" text-slate-500">
                    {MovieSpecificData?.data?.status}
                  </span>
                </p>
                <p>
                  Release Date:{" "}
                  <span className=" text-slate-500">
                    {MovieSpecificData?.data?.release_date}
                  </span>
                </p>
                <p>
                  Runtime:{" "}
                  <span className=" text-slate-500">
                    {MovieSpecificData?.data?.runtime}
                  </span>
                </p>
              </div>
              {/*director*/}
              <div>{/* <p>Director:{MovieSpecificData?data?.}</p> */}</div>
            </div>
          </div>
        </div>

        {/*section 2 CAST*/}
        <div className="">
          <p className="text-white text-3xl">Top Cast </p>
          <div className="flex mt-7 justify-between gap-3">
            {Cast.slice(0, 6).map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="rounded-full overflow-hidden w-24 aspect-square lg:w-32">
                  <img src={imageBaseUrl + "w400" + data.profile_path} />
                </div>
                <h2 className=" text-lg text-white ml-5 mt-1">{data?.name}</h2>
                <p className=" mt-1 ml-5 text-slate-400">{data?.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/*official video */}
        <div className="py-5">
          <h2 className="text-3xl text-white">Official Video</h2>
          <video>
            <source src={OfficialVideo?.AE?.link} />
          </video>
        </div>

        {/*similar movie*/}
        <div>
          <h2 className="text-white text-3xl py-4">Similar Video</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4">
            {" "}
            {SimilarVideo?.slice(0, 5)?.map((data, index) => (
              <Link to={`/movie/${data?.id}`} key={index}>
                <Card movie={data} />
              </Link>
            ))}
          </div>
        </div>

        {/*recommendation*/}
        <div className=" mt-6">
          <h2 className="text-white text-2xl py-4">Recommendations</h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4 ">
            {Recommended.slice(0, 5).map((data, index) => (
              <Link to={`/movie/${data?.id}`} key={index} >
                <Card movie={data} className="">
                  {/*posster pth*/}
                  <img
                    className="rounded-lg"
                    src={imageBaseUrl + "w400" + data?.poster_path}
                  />
                  <p className="text-white text-[20px] ml-3">
                    {data?.original_title &&
                      (data.original_title.length > 13
                        ? `${data.original_title
                            .split(" ")
                            .slice(0, 3)
                            .join(" ")}...`
                        : data.original_title)}
                  </p>
                  <h4 className=" mt-2 ml-3 text-slate-400 mb-10">
                    {data?.release_date}
                  </h4>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>) : <Loader />
      }
     
    </div>
  );
};

export default Testing;
