import React, { useEffect, useState } from 'react'
import { apiConnector } from '../sevices/axios';


const ThrTab = () => {

    const[days,setDays]=useState([]);
    const[week,setWeek]=useState([]);
    const[PopularMovie,setPopularMovie]=useState([]);
    const[PopularTvShow,setPopularTvShow]=useState([]);
    const[currentClick,setCurrentClick]=useState("days");
    const[currentClickWhat,setCurrentClickWhat]=useState("movie");
    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    const BASE_URL=import.meta.env.VITE_BASE_URL;

    async function fetchMovieDay(){
       
          const response=await apiConnector("GET",BASE_URL+"/trending/movie/day?language=en-US");
         if(response){
            setDays(response?.data?.results);
         }
    }
   
    async function fetchMovieBaseOnWeek(){
         const response=await apiConnector("GET",BASE_URL+"/trending/movie/week?language=en-US")
         if(response){
            setWeek(response?.data?.results);
         }
    }

    async function fetchPopularMovie(){
       const response=await apiConnector("GET",BASE_URL+"/movie/popular?language=en-US&page=1")
       if(response){
           setPopularMovie(response?.data?.results);
       }
    }

    async function fetchPopularTvShow(){
       const response=await apiConnector("GET",BASE_URL+"/tv/popular?language=en-US&page=1")
       console.log("res",response);
       if(response){
        setPopularTvShow(response?.data?.results);
       }
    }

    useEffect(()=>{

        fetchMovieDay();
        fetchMovieBaseOnWeek();
        fetchPopularMovie();
        fetchPopularTvShow();

    },[])
     
    console.log("tvshow",PopularTvShow);
  return (
    <div className=' text-white'>
        
        {/*trending*/}

         <div className=' flex-col '>
              {/*2 button*/}
              <div className='  w-[72%] mx-auto'>
                  <div className='flex    justify-between   '>
                          <h1 className=' text-3xl '>Trending</h1>
                  <div  className=' flex gap-3   bg-white  w-32  justify-center cursor-pointer p-3 text-black rounded-full'>
                           <div className={`${currentClick==="days" ? " text-orange-500" : " text-black "}`} onClick={()=>setCurrentClick("days")}>Day</div>
                           <div className={`${currentClick==="months" ? "  text-orange-500" : " text-black "}`} onClick={()=>setCurrentClick("months")}>Week</div>
                  </div>
                  </div>
              </div>

              {/*card*/}
              {
                  currentClick==="days" ? (
                    <div className='flex justify-center gap-5  mt-6'>
                          {
                              days?.slice(0,5)?.map((data,index)=>(
                                 <div key={index} >
                                         {/*img*/}
                                         <img className=' h-[19rem]  w-52 rounded-xl' src={IMAGE_BASE_URL+"w400"+data?.poster_path}/>

                                         {/*genre*/}
                                         
                                         {/*round*/}
                                    
                                         {/*name*/}
                                        <p className=' text-lg'> {data?.original_title && (
                                            data.original_title.length > 13
                                              ? `${data.original_title.split(' ').slice(0, 3).join(' ')}...`
                                              : data.original_title
                                          )}</p>
                                         {/*date*/}
                                        <p>{data?.release_date}</p>

                                 </div>
                              ))
                          }
                    </div>
                  ) : (
                    <div className='flex justify-center gap-3  mt-6'>
                         {
                            week?.slice(0,5)?.map((data,index)=>(
                                  <div key={index} >
                                          {/*img*/}
                                          <img  className=' h-[19rem]  w-52 rounded-xl' src={IMAGE_BASE_URL+"w400"+data?.poster_path}/>

                                          {/*genre*/}
                                          
                                          {/*round*/}
                                      
                                          {/*name*/}
                                          <p> {data?.original_title && (
                                              data.original_title.length > 13
                                                ? `${data.original_title.split(' ').slice(0, 3).join(' ')}...`
                                                : data.original_title
                                            )}</p>
                                          {/*date*/}
                                          <p>{data?.release_date}</p>

                                  </div>
                                ))
                         }
                    </div>
                  )
              }
         </div>
          
          {/*what popular*/}

          <div className=' mt-10'>
                    {/*2 button*/}
              <div className='  w-[72%] mx-auto'>
                  <div className='flex    justify-between   '>
                          <h1 className=' text-3xl '>What's Popular</h1>
                      <div  className=' flex gap-3   bg-white  w-32  justify-center cursor-pointer p-3 text-black rounded-full'>
                              <div className={`${currentClickWhat==="movie" ? " text-orange-500" : " text-black "}`} onClick={()=>setCurrentClickWhat("movie")}>Movie</div>
                              <div className={`${currentClickWhat==="tvshow" ? "  text-orange-500" : " text-black "}`} onClick={()=>setCurrentClickWhat("tvshow")}>TvShow</div>
                      </div>
                  </div>
             </div>

             {/*card*/}
             <div>
                   {
                      currentClickWhat==="movie"? (
                         <div  className='flex justify-center gap-5  mt-6'>
                                {
                                  PopularMovie.slice(0,5).map((data,index)=>(
                                       <div key={index}>
                                                 {/*img*/}
                                         <img className=' h-[19rem]  w-52 rounded-xl' src={IMAGE_BASE_URL+"w400"+data?.poster_path}/>

                                          {/*genre*/}

                                          {/*round*/}

                                          {/*name*/}
                                              <p className=' text-lg'> {data?.original_title && (
                                                data.original_title.length > 13
                                                  ? `${data.original_title.split(' ').slice(0, 3).join(' ')}...`
                                                  : data.original_title
                                              )}</p>

                                               {/*date*/}
                                           <p>{data?.release_date}</p>

                                       </div>
                                  ))
                                }
                         </div>
                      ) : (
                         <div className='flex justify-center gap-5  mt-6'>
                                {
                                    PopularTvShow.slice(0,5).map((data,index)=>(
                                         <div key={index}>

                                                        {/*img*/}
                                         <img className=' h-[19rem]  w-52 rounded-xl' src={IMAGE_BASE_URL+"w400"+data?.poster_path}/>

                                                       {/*genre*/}

                                                       {/*round*/}

                                                       {/*name*/}
                                              <p className=' text-lg'> {data?.overview && (
                                                data.overview.length > 13
                                                  ? `${data.overview.split(' ').slice(0, 3).join(' ')}...`
                                                  : data.overview
                                              )}</p>

                                                  {/*date*/}
                                              <p>{data?.first_air_date}</p>

                                         </div>
                                    ))
                                }
                         </div>
                      )
                   }
             </div>
          </div>
    </div> 
  )
}

export default ThrTab