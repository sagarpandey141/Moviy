import React, { useState } from 'react'
import { apiConnector } from '../sevices/axios';
import { movieUrls } from '../sevices/urls';
const Testing = () => {
    
    const [MovieSpecificData,setMovieSpecificData]=useState(null);
    async function GetSpecificMovieData()
    {
        const response= await apiConnector("GET",movieUrls.MOVIE_DETAIL);
        if(response){
          setMovieSpecificData(response);
        }
    }
   
    GetSpecificMovieData();
    console.log("getspecifec",MovieSpecificData);
  return (
    <div>
          {/*section 1*/}
         <div className='flex justify-center'>
              {/*left part*/}
              <div>
                        <img src={MovieSpecificData?.data?.poster_path}/>
              </div>
              {/*right part*/}
              <div>
                  <h2 className=' text-2xl'>{MovieSpecificData?.data?.belongs_to_collection?.name}</h2>
                  <p>{MovieSpecificData?.data?.tagline}</p>
                  {/*genres*/}
                  {
                    MovieSpecificData?.data?.genres?.map((index,data)=>(
                      <p key={index}>{data?.name}</p>
                    ))
                  }
                  {/*vote averge*/}
                  <div>
                      {MovieSpecificData?.data?.vote_average}
                  </div>
                  {/*overview*/}
                  <div>
                     <h2>OverView</h2>
                     <p>{MovieSpecificData?.data?.overview}</p>
                  </div>
                  {/*status released runtime */}
                  <div className='flex gap-2'>
                     <p>Status:{MovieSpecificData?.data?.status}</p>
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