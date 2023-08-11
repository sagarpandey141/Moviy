import React, { useEffect, useState } from "react";
import { apiConnector } from "../sevices/axios";
import { movieUrls } from "../sevices/urls";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Loader } from "../components/Loader";
import { resetPageAndResults, resetUrls, setUrls } from "../Redux/Slices/movieSlice";
import CastProfile from "./CastProfile";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
const Testing = () => {
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const thumnail_url =
    "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBf-zXFP5QpHzoyX6DndKdir2VCNDYmaWI&id=";
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const {urls} = useSelector(state => state.movie);
  const [MovieSpecificData, setMovieSpecificData] = useState(null);
  async function GetSpecificMovieData() {
    const response = await apiConnector(
      "GET",
      movieUrls.MOVIE_DETAIL +
        `${movieId}` +
        `?append_to_response=credits,recommendations,similar,videos`
    );
    console.log("hello", response.data);
    if (response) {
      setMovieSpecificData(response.data);
    }
  }

  async function GetThumbnail(key) {
    const response = await fetch(thumnail_url + key + "&part=snippet");
    const data = await response.json();
    console.log("resp", data);
    // console.log(data.items[0]?.snippet.thumbnails?.medium?.url)
    return data?.items[0]?.snippet?.thumbnails?.medium?.url;
  }

  async function storeUrl(dispatch) {
    for (
      let x = 0;
      x < MovieSpecificData?.videos.results.length && x < 10;
      x++
    ) {
      const thumbnailImage = await GetThumbnail(
        MovieSpecificData.videos.results[x].key
      );
    console.log(thumbnailImage);
    dispatch(setUrls(thumbnailImage));
    }
  }

  useEffect(() => {
    dispatch(resetUrls());
    dispatch(resetPageAndResults());
    (async function () {
      await GetSpecificMovieData();
      await storeUrl(dispatch);
    })();
    // added because when you click on movie card ,inside a opened card then it does not go to top of webapp
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [movieId]);
  return (
    <div className="bg-[#08172f]">
      {/*section 1*/}
      {MovieSpecificData ? (
        <div className="max-w-4xl mx-auto w-11/12 py-10 grid gap-5">
          {/* hero section */}
          <div className="">
            {/*<img src={imageBaseUrl+"w400"+MovieSpecificData?.data?.backdrop_path}/>*/}

            <div className="flex gap-4 text-white items-center">
              {/*left part*/}
              <img
                className="rounded-md "
                src={imageBaseUrl + "w300" + MovieSpecificData?.poster_path}
              />

              {/*right part*/}
              <div className="">
                <h2 className="text-4xl">{MovieSpecificData?.title}</h2>
                <p className=" text-slate-600 italic mt-1 text-xl">
                  {MovieSpecificData?.tagline}
                </p>

                {/*genres*/}
                <div className="flex gap-2">
                  {MovieSpecificData?.genres?.map((data, index) => {
                    return (
                      <p
                        key={index}
                        className="bg-pink-500 p-1 text-xs rounded"
                      >
                        {data?.name}
                      </p>
                    );
                  })}
                </div>
                {/*vote averge*/}
                <div className=" w-16 h-16 items-center text-white">
                  <CircularProgressbar
                    maxValue={10}
                    value={MovieSpecificData.vote_average.toFixed(2)}
                    text={`${MovieSpecificData.vote_average?.toFixed(2)}%`}
                    background={true}
                    backgroundPadding={5}
                    styles={buildStyles({
                      pathColor:
                        MovieSpecificData.vote_average >= 7
                          ? "green"
                          : "#FFA41B",
                      backgroundColor: "white",
                      trailColor: "#fff",
                    })}
                  />
                </div>
                {/*overview*/}
                <div>
                  <h2 className="text-3xl mt-3">OverView</h2>
                  <p className="text-lg mt-2">{MovieSpecificData?.overview}</p>
                </div>
                {/*status released runtime */}
                <div className="flex gap-2">
                  <p className="">
                    Status:{" "}
                    <span className=" text-slate-500">
                      {MovieSpecificData?.status}
                    </span>
                  </p>
                  <p>
                    Release Date:{" "}
                    <span className=" text-slate-500">
                      {MovieSpecificData?.release_date}
                    </span>
                  </p>
                  <p>
                    Runtime:{" "}
                    <span className=" text-slate-500">
                      {MovieSpecificData?.runtime}
                    </span>
                  </p>
                </div>
                {/*director*/}
                <div>{/* <p>Director:{MovieSpecificData?data?.}</p> */}</div>
              </div>
            </div>
          </div>

          {/*section 2 person*/}
          <div className="">
            <p className="text-white text-3xl">Top person </p>
            <div className="grid grid-cols-6 mt-7 justify-between gap-3">
              {MovieSpecificData?.credits?.cast
                ?.slice(0, 6)
                .map((data, index) => (
                  <CastProfile cast={data} key={index} />
                ))}
            </div>
          </div>

          {/*official video*/}
          <div>
            <h2>Official Videos</h2>
            <div>
              <Swiper
                modules={[FreeMode, Pagination, Autoplay]}
                loop={true}
                className="max-w-4xl"
                spaceBetween={20}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  
                  },
                  768: {
                    slidesPerView: 4,
                   
                  },
                  1024: {
                    slidesPerView: 5,
                   
                  },
                }}
              >
                {urls.map((data, index) => (
                  <SwiperSlide key={index}>
                    <img src={data} alt="run" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/*similar movie*/}
          {MovieSpecificData?.similar.results.length > 0 && (
            <div>
              <h2 className="text-white text-3xl py-4">Similar Video</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4">
                {" "}
                {MovieSpecificData?.similar?.results
                  .slice(0, 5)
                  ?.map((data, index) => (
                    <Card movie={data} key={index} />
                  ))}
              </div>
            </div>
          )}

          {/*recommendation*/}
          {MovieSpecificData?.recommendations.results.length > 0 && (
            <div className="">
              <h2 className="text-white text-2xl py-4">Recommendations</h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4 ">
                {MovieSpecificData?.recommendations.results
                  .slice(0, 5)
                  .map((data, index) => (
                    <Card movie={data} key={index} />
                  ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default Testing;
