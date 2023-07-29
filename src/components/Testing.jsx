import React, { useEffect, useState } from 'react'
import { apiConnector } from '../sevices/axios';
import { movieUrls } from '../sevices/urls';
import { useParams } from 'react-router-dom';

const Testing = () => {

    const imageBaseUrl=import.meta.env.VITE_IMAGE_BASE_URL
    const {movieId}=useParams();
    const [MovieSpecificData,setMovieSpecificData]=useState(null);
    const[Cast,setCast]=useState([]);
    async function GetSpecificMovieData()
    {
        const response= await apiConnector("GET",movieUrls.MOVIE_DETAIL+`${movieId}`);
        if(response){
          setMovieSpecificData(response);
        }
    }
   
  //  GetSpecificMovieData();
   console.log("cast",Cast);
  async function GetCredit(){
            const response=await apiConnector("GET",movieUrls.MOVIE_DETAIL+`${movieId}/credits`)
            if(response){
               setCast(response?.data?.cast);
            }
  }
    useEffect(()=>{
        GetSpecificMovieData();
        GetCredit();
    },[movieId])
   
    console.log("getspecifec",MovieSpecificData);
  return (
    <div className='bg-[#08172f]  w-screen  h-max '>
          {/*section 1*/}
         <div className='flex  justify-center  gap-20 '>
            {/*<img src={imageBaseUrl+"w400"+MovieSpecificData?.data?.backdrop_path}/>*/}
            
            <div className=' mt-28 flex  justify-center  gap-20 text-white'>
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
                  <div className='flex gap-2 mt-7'>
                     <p className=''>Status: <span className=' text-slate-500'>{MovieSpecificData?.data?.status}</span></p>
                     <p>Release Date: <span className=' text-slate-500'>{MovieSpecificData?.data?.release_date}</span></p>
                     <p>Runtime: <span className=' text-slate-500'>{MovieSpecificData?.data?.runtime}</span></p>
                  </div>
                  {/*director*/}
                  <div>
                    {/* <p>Director:{MovieSpecificData?data?.}</p> */}
                  </div>
              </div>
            </div>
         </div>

         {/*section 2 CAST*/}
          <div className=' mt-10'>
                  <p className='text-white text-3xl  translate-x-48'>Top Cast </p>
                 <div className='flex mt-7 justify-center gap-3'>
                    {
                        Cast.slice(0,6).map((data,index)=>(
                        
                            <div key={index} className=''>
                                  <img className='rounded-full h-52 w-48' src={imageBaseUrl+"w400"+data?.profile_path}/>
                                  <h2 className=' text-lg text-white ml-5 mt-1'>{data?.name}</h2>
                                  <p className=' mt-1 ml-5 text-slate-400'>{data?.character}</p>
                            </div>
                        ))
                      }
                 </div>
          </div>
    </div>
  )
}

export default Testing