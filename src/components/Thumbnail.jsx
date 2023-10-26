import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { setUrls } from "../Redux/Slices/movieSlice";

const Thumbnail = ({videosImg,movieId}) => {
  const { urls } = useSelector((state) => state.movie);
  console.log(videosImg)
  const dispatch = useDispatch();
  const thumnail_url =
    "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBf-zXFP5QpHzoyX6DndKdir2VCNDYmaWI&id=";

  async function GetThumbnail(key) {
    const response = await fetch(thumnail_url + key + "&part=snippet");
    const data = await response.json();
    console.log(data);
    // console.log(data.items[0]?.snippet.thumbnails?.medium?.url)
    return data?.items[0]?.snippet?.thumbnails?.medium?.url;
  }

  async function storeUrl() {
    for (
      let x = 0;
      x < videosImg.length && x < 10;
      x++
    ) {
      const thumbnailImage = await GetThumbnail(videosImg[x].key);
      console.log(thumbnailImage);
      dispatch(setUrls(thumbnailImage));
    }
  }
  useEffect(() => {
   (async function() {
    await storeUrl();
   } )();
  },[movieId]);
  return (
    <div className="">
      <h2>Official Videos</h2>
      <div>
        <Swiper
          modules={[FreeMode, Pagination, Autoplay]}
          loop={true}
          className="max-w-4xl"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {urls.map((data, index) => (
            <SwiperSlide key={index}>
              <img src={data} alt="run" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Thumbnail;
