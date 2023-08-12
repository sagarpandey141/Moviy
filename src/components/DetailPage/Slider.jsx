import React, { useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'

const Slider = ({OfficialVideo,url,setModal}) => {
    console.log("off",OfficialVideo,url);
  const[data,setData]=useState(null);
    async function GetThumbnail(key){
        const response=await fetch(url+key+"&part=snippet");
        const data=await response.json();
         console.log("resp",data);
      
       if(data){
           setData( data?.items?.[0]?.snippet?.thumbnails?.medium?.url);
       }
  }
    useEffect(()=> {
        GetThumbnail(OfficialVideo.key);
    },[]);
    console.log("data",data);
  return (
   
            <div>
                {/*img*/}
                <img src={data} className=' h-[12rem] rounded-xl cursor-pointer  transform hover:bg-black hover:shadow-lg' onClick={()=>setModal(OfficialVideo.key)}/>
                <p className=' text-[1.2rem] text-white mt-1'>{OfficialVideo.name}</p>
            </div>
   
  )
}

export default Slider