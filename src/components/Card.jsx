import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DateFormator } from "../utils/DateFormator";
import Genre from "../RawData/Genre.json";
import { Link } from "react-router-dom";
import NoPoster from "../assets/no-poster.jpeg";

const Card = ({ movie }) => {
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
  let index = 0;
  const arr = [];
  for (let t = 0; t < 2; t++) {
    for (let x of Genre) {
      if (x.id == movie?.genre_ids[index]) {
        arr.push(x.name);
        index++;
        break;
      }
    }
  }

  return (

       <div className="flex flex-col w-fit mb-5">
      <div className="relative hover:brightness-75 duration-500 cursor-pointer">
        <Link to={`/movie/${movie.id}`}>
          <img
            src={
              movie.poster_path != null
                ? IMAGE_BASE_URL + "w300" + movie?.poster_path
                : NoPoster
            }
            alt={movie?.title}
            className="rounded-md relative object-cover"
            loading="lazy"
          />
        </Link>
        <div className="absolute bottom-0 translate-y-1/2 left-2 w-10">
          <CircularProgressbar
            maxValue={10}
            value={movie.vote_average}
            text={`${movie.vote_average?.toFixed(2)}%`}
            background={true}
            backgroundPadding={5}
            styles={buildStyles({
              pathColor: movie.vote_average >= 7 ? "green" : "#FFA41B",
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
              {genreName}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 w-full font-semibold">
        <h2 className="text-white">{movie.title ? movie.title : movie.name}</h2>
        <p className="font-normal text-gray-500   ">
          {DateFormator(movie.release_date? movie.release_date : movie.first_air_date)}
        </p>
      </div>
    </div>
  );
};
export default Card;
