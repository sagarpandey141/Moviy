import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../sevices/axios';
import { movieUrls } from '../../sevices/urls';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper/modules'
import axios from 'axios';
import Slider from './Slider';
import Modal from './Modal';
import noPoster from "../../assets/no-poster.jpeg"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import NoCast from "../../assets/not-av.jpg"

const Testing = () => {

    const imageBaseUrl=import.meta.env.VITE_IMAGE_BASE_URL
    const thumnail_url="https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBf-zXFP5QpHzoyX6DndKdir2VCNDYmaWI&id="
    const {movieId}=useParams();
    const [MovieSpecificData,setMovieSpecificData]=useState(null);
    const [Cast,setCast]=useState([]);
    const [OfficialVideo,setOfficialVideo]=useState([]);
    const [SimilarVideo,setSimilar]=useState([]);
    const [Recommended,setRecommended]=useState([]);
    const[modal,setModal]=useState(null);
    const navigate=useNavigate();

    async function GetSpecificMovieData()
  {
      const response= await apiConnector("GET",movieUrls.MOVIE_DETAIL+`${movieId}`);
    console.log("res",response);
      if(response){
        setMovieSpecificData(response);
      } 
  }
   
  async function GetCredit(){
            const response=await apiConnector("GET",movieUrls.MOVIE_DETAIL+`${movieId}/credits`)
            if(response){
               setCast(response?.data?.cast);
            }
  }

  async function getOfficialVideo(){
       const response=await apiConnector("GET",movieUrls.MOVIE_DETAIL+`${movieId}/videos`)
       console.log("resp video",response);
       if(response)
       { 
          setOfficialVideo(response?.data?.results);
       }
  }

 
   
  async function getSimilarVideo(){
         const response=await apiConnector("GET",movieUrls.MOVIE_DETAIL+`${movieId}/similar`);
         console.log("similar",response);
         if(response){
             setSimilar(response?.data?.results);
         }
  }

  async function RecommendadVideo(){
        const response=await apiConnector("GET",movieUrls.MOVIE_DETAIL+`${movieId}/recommendations`);
        console.log(
          "recomme",response
        )
        if(response){
           setRecommended(response.data.results);
        }

  }
 

 
    useEffect(()=>{

      

        GetSpecificMovieData();
        GetCredit();
        getOfficialVideo();
        getSimilarVideo();
        RecommendadVideo();
        window.scrollTo({top:0,left:0,behavior:'smooth'})

    },[movieId])
   


  return (
 
    <div className='bg-[#08172f]  w-screen  h-max  overflow-hidden'>
     
     {
       OfficialVideo.length==0 ? (
            <div> 
                 <div className='spinner'></div>
             </div>
       )  : (
        <div className='relative'>
       
       {/*section 1*/}
      <div className='flex  justify-center  gap-20 bg-[#08172f] '
       //  style={{
       //     backgroundImage: `url(${imageBaseUrl+"w400"+MovieSpecificData?.data?.backdrop_path})`,
       //     backgroundSize: "cover",
       //     backgroundPosition: "center",
       //     backgroundRepeat: "no-repeat",
           
       //   }}
       >
          
         <div className=' mt-28 flex  justify-center  gap-20 text-white '>
                 {/*left part*/}
               <div>
                    <img className=' h-[32rem] rounded-md' src={imageBaseUrl+"w400"+MovieSpecificData?.data?.poster_path}/>
               </div>
           
           {/*right part*/}
           <div className='max-w-[50%]'>
                     <h2 className=' text-4xl'>{MovieSpecificData?.data?.belongs_to_collection?.name}</h2>
                     <p className=" text-slate-400 italic mt-1 text-2xl">{MovieSpecificData?.data?.tagline}</p>

                   {/*genres*/}
                     <div className='flex gap-3 mt-1 '>
                         {
                             MovieSpecificData?.data?.genres?.map((data,index)=>{
                             return <p key={index} className=' bg-pink-600 p-1 rounded-md' >{data?.name}</p>
                           })
                         }
                     </div>
               {/*vote averge*/}
               <div className=' flex mt-4  rounded-full bg-slate-800  w-24 h-24 items-center text-white'>
               <CircularProgressbar
                   maxValue={10} value={MovieSpecificData?.data?.vote_average} text={`${MovieSpecificData?.data?.vote_average?.toFixed(2)}%`}
                   background={true}
                   backgroundPadding={5}

                   styles={buildStyles({
                     pathColor: MovieSpecificData?.data?.vote_average >= 7 ? "green" : "#FFA41B",
                     backgroundColor: "#000000",
                     trailColor: '#000000'
                   })}
               />
               </div>
               {/*overview*/}
               <div>
                  <h2 className='text-3xl mt-3'>OverView</h2>
                  <p className='text-lg mt-2'>{MovieSpecificData?.data?.overview}</p>
               </div>
               {/*status released runtime */}
               <div className='flex gap-2 mt-7'>
                  <p className=' text-lg'>Status: <span className=' text-slate-500'>{MovieSpecificData?.data?.status}</span></p>
                  <p className='text-lg'>Release Date: <span className=' text-slate-500'>{MovieSpecificData?.data?.release_date}</span></p>
                  <p className='text-lg'>Runtime: <span className=' text-slate-500'>{MovieSpecificData?.data?.runtime}</span></p>
               </div>
              <div className=' border-b-[1px] h-1 border-slate-500 mt-4'></div>
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
                             <img className='rounded-full  aspect-square object-right-top w-48 object-cover' src={data?.profile_path?imageBaseUrl+"w400"+data?.profile_path:NoCast}/>
                               <h2 className=' text-lg text-white ml-5 mt-1'>{data?.name}</h2>
                               <p className=' mt-1 ml-5 text-slate-400'>{data?.character}</p>
                         </div>
                     ))
                   }
              </div>
       </div>
       
     
       {/*official video*/}
       {
         OfficialVideo.length>0 && (
           <div className=' my-7'>
           <h2 className=' text-white text-3xl translate-x-36'>Official Videos</h2>
            <div className=' mt-6'>
            <Swiper
                 modules={[FreeMode, Pagination, Autoplay]}
                 setWrapperSize={20}
                 slidesPerView={4}
                 spaceBetween={20}
                 autoplay={false}
                 className='w-[77rem] mx-auto  h-[17rem] '
                 
               
                  >
                  {
                     OfficialVideo.map((data,index)=>(
                       <SwiperSlide>
                          <Slider OfficialVideo={data} url={ thumnail_url} setModal={setModal}/>
                       </SwiperSlide>
                    
                   ))
                  }
             </Swiper>
            </div>
       </div>

         )
       }
       
       
       {/*similar movie*/}
     {
       SimilarVideo.length>0 && (
         <div className=' my-6'>
            <h2 className='text-white text-3xl ml-36'>Similar Video</h2>
             <div className=' mt-6 flex justify-center gap-4'>
                 {
                   SimilarVideo?.slice(0,5)?.map((data,index)=>(
                    <Link to={`/movie/${data.id}`} key={index}>
                      <div className=''>
                              
                            {/*poster */}
                            <img className=' h-[22rem]  rounded-lg  cursor-pointer' src={ data?.poster_path!=null ? imageBaseUrl+"w400"+data?.poster_path :noPoster }/>
                            <p>{data?.vote_average}</p>
                            <p>{}</p>

                            {/*name*/}
                            <p className='text-white text-[20px] ml-3'>
                                 {data?.original_title && (
                                   data.original_title.length > 13
                                     ? `${data.original_title.split(' ').slice(0, 3).join(' ')}...`
                                     : data.original_title
                                 )}
                           </p>
                            {/*date*/}
                            <p className=' mt-2 ml-3 text-slate-400'>{data?.release_date}</p>
                       </div>
                     </Link>
                   ))
                 }
             </div>
       </div>
       )
     }
        
        {/*recommendation*/}
        {
           Recommended.length>0 && (
             <div className=' my-6'>
             <h2 className='text-white text-2xl ml-36'>Recommendations</h2>
           
               <div className='flex justify-center gap-4 mt-5'>
                   {
                     Recommended.slice(0,5).map((data,index)=>(
                       <Link to={`/movie/${data?.id}`} key={index}  >
                         <div className=''>
                               {/*posster pth*/}
                               <img className=' h-[22rem]  rounded-lg' src={data?.poster_path!=null ? imageBaseUrl+"w400"+data?.poster_path :noPoster}/>
                               <p className='text-white text-[20px] ml-3'>
                                   {data?.original_title && (
                                     data.original_title.length > 13
                                       ? `${data.original_title.split(' ').slice(0, 3).join(' ')}...`
                                       : data.original_title
                                   )}
                             </p>
                               <h4 className=' mt-2 ml-3 text-slate-400 mb-10'>{data?.release_date}</h4>
                         </div>
                         </Link>
                     ))
                   }
               </div>
       
        </div>
            )
        }

        </div>
       )
     }
      
        
          {/*modal*/}
                
                {
                  modal && (
                    <Modal data={modal} setModal={setModal} ></Modal>
                  )
                }

    </div>
  );
};
export default Testing;

