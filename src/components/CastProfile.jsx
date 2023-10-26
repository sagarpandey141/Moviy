import React from 'react'
const ImageUrl = import.meta.env.VITE_IMAGE_BASE_URL;
import notFound from "../assets/OIP.jpeg"
const CastProfile = ({cast}) => {
    const {name,profile_path,character} = cast;
  return (
    <div className='flex flex-col items-center gap-3'>
        <img className='w-12 md:w-20 lg:w-28 aspect-square object-cover rounded-full' src={profile_path ? ImageUrl + "w300" + profile_path : notFound } alt={name} />
        <div className=''>
             <h2 className='text-center text-white font-semibold' >{name}</h2>
             <p className='text-center text-gray-400'>{character == undefined ? cast.known_for_department : character}</p>
        </div>
    </div>
  )
}
export default CastProfile