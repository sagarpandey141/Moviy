import React, { useEffect, useState } from 'react'
import { apiConnector } from '../sevices/axios';
import { movieUrls } from '../sevices/urls';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Slider from './Slider';
import {Loader} from "../components/Loader"
import {resetPageAndResults} from "../Redux/Slices/movieSlice"
import CastProfile from './CastProfile';
import { Swiper } from 'swiper/react';
import Card from "./Card"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination,Autoplay } from 'swiper/modules';
const Testing = () => {

    const imageBaseUrl=import.meta.env.VITE_IMAGE_BASE_URL
    const thumnail_url="https://www.googleapis.com/youtube/v3/videos?key=AIzaSyATLv1nHCi0x45asS0Zlwvv-Zdr7Vd--RA&id="
    const {movieId}=useParams();
    const dispatch = useDispatch();
    const [MovieSpecificData,setMovieSpecificData]=useState(null);
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

  useEffect(() => {
    dispatch(resetPageAndResults());
    (async function () {
      await GetSpecificMovieData();
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
              <div className='max-w-[50%]'>
                        <h2 className=' text-4xl'>{MovieSpecificData?.title}</h2>
                        <p className=" text-slate-600 italic mt-1 text-2xl">{MovieSpecificData?.tagline}</p>

                      {/*genres*/}
                        {
                          MovieSpecificData?.data?.genres?.map((index,data)=>{
                          return <p key={index}>{data?.name}</p>
                        })
                      }
                  {/*vote averge*/}
                  <div className=' flex  rounded-full bg-slate-800 w-16 h-16 items-center text-white'>
                      <p className=' text-center text-2xl ml-4'>{MovieSpecificData?.data?.vote_average}</p>
                  </div>
                  {/*overview*/}
                  <div>
                     <h2 className='text-3xl mt-3'>OverView</h2>
                     <p className='text-lg mt-2'>{MovieSpecificData?.overview}</p>
                  </div>
                  {/*status released runtime */}
                  <div className='flex gap-2'>
                     <p className=''>Status: <span className=' text-slate-500'>{MovieSpecificData?.status}</span></p>
                     <p>Release Date: <span className=' text-slate-500'>{MovieSpecificData?.release_date}</span></p>
                     <p>Runtime: <span className=' text-slate-500'>{MovieSpecificData?.runtime}</span></p>
                  </div>
                  {/*director*/}
                  <div>
                    {/* <p>Director:{MovieSpecificData?data?.}</p> */}
                  </div>
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
                    setWrapperSize={20}
                    slidesPerView={2}
                    spaceBetween={20}
                    loop={true}
                    className='max-w-3xl mx-auto  '
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction:false
                    }}
                  
                     >
                     {
                        MovieSpecificData.videos.results.map((data,index)=>(
                        <Slider OfficialVideo={data} url={ thumnail_url}/>
                      ))
                     }
                </Swiper>
               </div>
          </div>

          {/*official video */}

          {/*similar movie*/}
          { MovieSpecificData?.similar.results.lenght > 0 &&  <div>
            <h2 className="text-white text-3xl py-4">Similar Video</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4">
              {" "}
              {MovieSpecificData?.similar?.results
                .slice(0, 5)
                ?.map((data, index) => (
                  <Card movie={data} key={index} />
                ))}
            </div>
          </div> }
         

          {/*recommendation*/}
          {MovieSpecificData?.recommendations.results.length > 0 && (
            <div className=" mt-6">
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
