import React, { useEffect,useState } from 'react'
import { apiConnector } from '../../sevices/axios';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import {buildStyles} from 'react-circular-progressbar';

const WhatsPopular = () => {
    
    const BASE_URL=import.meta.env.VITE_BASE_URL;
    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    const[PopularMovie,setPopularMovie]=useState([]);
    const[PopularTvShow,setPopularTvShow]=useState([]);
    const[currentClickWhat,setCurrentClickWhat]=useState("movie");
    const navigate=useNavigate();
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

     useEffect(()=>(
         fetchPopularMovie(),
         fetchPopularTvShow()
     ),[])
  return (
           

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
                                        <div key={index} className='relative'>
                                                {/*img*/}
                                        <img className=' h-[19rem]  w-52 rounded-xl cursor-pointer' onClick={()=>{
                                            navigate(`/movie/${data?.id}`)
                                        }} src={IMAGE_BASE_URL+"w400"+data?.poster_path}/>

                                            {/*genre*/}
                                        
                                            {/*round*/}
                                        <div className="absolute bottom-0 -translate-y-12 left-2 w-10">
                                            <CircularProgressbar
                                                maxValue={10}
                                                value={data.vote_average}
                                                text={`${data.vote_average?.toFixed(2)}%`}
                                                background={true}
                                                backgroundPadding={5}
                                                styles={buildStyles({
                                                    pathColor: data.vote_average >= 7 ? "green" : "#FFA41B",
                                                    backgroundColor: "white",
                                                    trailColor: "#fff",
                                                })}
                                            />
                                            </div>
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
                                        <div key={index} className='relative'>

                                                        {/*img*/}
                                        <img className=' h-[19rem]  w-52 rounded-xl cursor-pointer'onClick={()=>{
                                            navigate(`/movie/${data?.id}`)
                                        }} src={IMAGE_BASE_URL+"w400"+data?.poster_path}/>

                                                        {/*genre*/}
                                        
                                                            {/*round*/}
                                        <div className="absolute bottom-0 -translate-y-12 left-2 w-10">
                                            <CircularProgressbar
                                                    maxValue={10}
                                                    value={data.vote_average}
                                                    text={`${data.vote_average?.toFixed(2)}%`}
                                                    background={true}
                                                    backgroundPadding={5}
                                                    styles={buildStyles({
                                                    pathColor: data.vote_average >= 7 ? "green" : "#FFA41B",
                                                    backgroundColor: "white",
                                                    trailColor: "#fff",
                                                    })}
                                                />
                                            </div>

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
  )
}

export default WhatsPopular