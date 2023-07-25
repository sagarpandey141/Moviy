import React, { useEffect, useState } from 'react'
import { apiConnector } from '../sevices/axios';
import { movieUrls } from '../sevices/urls';
import { useParams } from 'react-router-dom';

const Testing = () => {

    const imageBaseUrl=import.meta.env.VITE_IMAGE_BASE_URL
    const {movieId}=useParams();
    const [MovieSpecificData,setMovieSpecificData]=useState(null);

    async function GetSpecificMovieData()
    {
        const response= await apiConnector("GET",movieUrls.MOVIE_DETAIL+`${movieId}`);
        if(response){
          setMovieSpecificData(response);
        }
    }
   
  //  GetSpecificMovieData();

    useEffect(()=>{
        GetSpecificMovieData();
    },[movieId])

    console.log("getspecifec",MovieSpecificData);
  return (
    <div>
          {/*section 1*/}
         <div className='flex  justify-center border border-black mt-20  gap-20'>
              {/*left part*/}
              <div>
                        <img className=' h-[32rem] rounded-md' src={imageBaseUrl+"w400"+MovieSpecificData?.data?.poster_path}/>
              </div>
              {/*right part*/}
              <div className='max-w-[50%]'>
                  <h2 className=' text-4xl'>{MovieSpecificData?.data?.belongs_to_collection?.name}</h2>
                  <p className=" text-slate-600 italic mt-1 text-2xl">{MovieSpecificData?.data?.tagline}</p>
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
                     <p className='text-lg mt-2'>{MovieSpecificData?.data?.overview}</p>
                  </div>
                  {/*status released runtime */}
                  <div className='flex gap-2'>
                     <p className=''>Status:{MovieSpecificData?.data?.status}</p>
                     <p>Release Date:{MovieSpecificData?.data?.release_date}</p>
                     <p>Runtime:{MovieSpecificData?.data?.runtime}</p>
                  </div>
                  {/*director*/}
                  <div>
                    {/* <p>Director:{MovieSpecificData?data?.}</p> */}
                  </div>
              </div>
         </div>
    </div>
  )
}

export default Testing