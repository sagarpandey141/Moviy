import React, { useEffect,useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DateFormator } from "../utils/DateFormator";
import Genre from "../RawData/genre_t.json";
import { Link } from "react-router-dom";
import NoPoster from "../assets/no-poster.jpeg";

const Card = ({ tv }) => {
  const IMAGE_BASE_URL_T = import.meta.env.VITE_IMAGE_BASE_URL_T;
  const arr = [];
function setGenres() {
    // console.log(movie,"movied")
    for(let x=0; tv.genre_ids != undefined && x<2;x++){
      let tag = Genre.find((item) => item.id == movie.genre_ids[x])
      if(tag !== undefined)
      arr.push(tag);
    }
  }
  setGenres();

  return (

       <div className="flex flex-col w-fit mt-2">
      <div className="relative hover:brightness-75 duration-500 cursor-pointer">
        <Link to={`/tv/${tv.id}`}>
          <img
            src={
              movie.poster_path != null
                ? IMAGE_BASE_URL_T + "w300" + tv?.poster_path
                : NoPoster
            }
            alt={tv?.title}
            className="rounded-md relative object-cover"
            loading="lazy"
          />
        </Link>
        <div className="absolute bottom-0 translate-y-1/2 left-2 w-10">
          <CircularProgressbar
            maxValue={10}
            value={tv.vote_average}
            text={`${tv.vote_average?.toFixed(2)}%`}
            background={true}
            backgroundPadding={5}
            styles={buildStyles({
              pathColor: tv.vote_average >= 7 ? "green" : "#FFA41B",
              backgroundColor: "white",
              trailColor: "#fff",
            })}
          />
        </div>
        <div className="absolute flex justify-end flex-wrap gap-2 bottom-0 right-0 text-white p-2">
          { arr.map((genreName, index) => (
            <div
              key={index}
              className="bg-[#f5427b] rounded-sm p-[2px] text-xs"
            >
              {genreName.name}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 w-full font-semibold">
        <h2 className="text-white line-clamp-2">{tv.title ? tv.title : tv.name}</h2>
        <p className="font-normal text-gray-500">
          {DateFormator(tv.release_date? tv.release_date : tv.first_air_date)}
        </p>
      </div>
    </div>
  );
};
export default Card;
