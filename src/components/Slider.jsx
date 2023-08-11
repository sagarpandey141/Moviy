import React, { useEffect } from 'react'
import { SwiperSlide } from 'swiper/react'

const Slider = ({OfficialVideo,url}) => {
    console.log("off",OfficialVideo,url);

    async function GetThumbnail(key){
        const response=await fetch(url+key+"&part=snippet");
        const data=await response.json();
         console.log("resp",data);
      
       return data?.items?.[0]?.snippet?.thumbnails?.medium?.url
  }
    useEffect(()=> {
        (async function (){
            const image = await GetThumbnail(OfficialVideo.key)
            console.log("imagee",image);
        })();
    },[]);
    
  return (
    <SwiperSlide>Slider</SwiperSlide>
  )
}

export default Slider