import React, { useEffect, useState } from 'react'

const Slider = ({OfficialVideo,url}) => {
    const [imageUrl,setImageUrl] = useState(null);
    async function GetThumbnail(key){
        const response=await fetch(url+key+"&part=snippet");
        const data=await response.json();
         console.log("resp",data);
      
       return data?.items[0]?.snippet?.thumbnails?.medium?.url
  }
    // useEffect(()=> {
    //     (async function (){
    //         const image = await GetThumbnail(OfficialVideo.key)
    //         console.log("image",image);
    //         setImageUrl(image);
    //     })();
    // },[]);
  
  return ( <img src={imageUrl} alt="name" />)
}

export default Slider