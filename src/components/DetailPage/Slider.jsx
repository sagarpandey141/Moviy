import React, { useEffect, useState } from 'react'
import {AiFillYoutube} from "react-icons/ai"
const Slider = ({OfficialVideo,url,setModal}) => {
    
  const[data,setData]=useState(null);
    async function GetThumbnail(key){
        const response=await fetch(url+key+"&part=snippet");
        const data=await response.json();
        
      
       if(data){
           setData( data?.items?.[0]?.snippet?.thumbnails?.medium?.url);
       }
  }
    useEffect(()=> {
        GetThumbnail(OfficialVideo.key);
    },[]);
   
  return (
   
            <div className=''>
                {/*img*/}
                <div className='relative'  onClick={()=>setModal(OfficialVideo.key)}>
                    <img src={data} className=' rounded-xl cursor-pointer  transform hover:bg-black hover:shadow-lg'/>
                    <AiFillYoutube  className='absolute text-red-600  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2   cursor-pointer'  size={50}/>
                 </div>
                <p className='text-[1.2rem] line-clamp-2 text-white mt-1'>{OfficialVideo.name}</p>
            </div>
   
  )
}

export default Slider