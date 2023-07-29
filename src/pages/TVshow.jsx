// import React from 'react';
// import { useState } from 'react';

// export const TVshow = () => {
//   const [selectedGenre, setSelectedGenre] = useState(null);
//   const handleGenreChange = (event) => {
//     setSelectedGenre(event.target.value);
//   };

//   const [sortBy, setSortBy] = useState(null);
//   const handleSortChange = (event) => {
//     setSortBy(event.target.value);
//   };

//   return (
//     <div className=' bg-[#08172f] p-4'>
//       <p className='text-white text-xl py-4'>Explore TV Shows</p>
//       <div className='flex-col gap-2'>
//       <select onChange={handleGenreChange} value={selectedGenre || ''} className='rounded-xl py-1'>
//         <option value="" disabled hidden>Select genres</option>
//         <option value="Action and Adventure">Action and Adventure</option>
//         <option value="Animation">Animation</option>
//         <option value="Comedy">Comedy</option>
//         <option value="Crime">Crime</option>
//         <option value="Documentary">Documentary</option>
//         <option value="Drama">Drama</option>
//         <option value="Family">Family</option>
//         <option value="Kids">Kids</option>
//         <option value="Mystery">Mystery</option>
//         <option value="News">News</option>
//         <option value="Reality">Reality</option>
//         <option value="Sci-Fi & Fantasy">Sci-Fi & Fantasy</option>
//         <option value="Soap">Soap</option>
//         <option value="Talk">Talk</option>
//         <option value="War & Politics">War & Politics</option>
//         <option value="Western">Western</option>
//       </select>

//       <select onChange={handleSortChange} value={sortBy || ''} className='ml-2 rounded-xl py-1'>
//         <option value="" disabled hidden>Sort by</option>
//         <option value="Popularity Decending">Popularity Decending</option>
//         <option value="Popularity Ascending">Popularity Ascending</option>
//         <option value="Rating Decending">Rating Decending</option>
//         <option value="Rating Ascending">Rating Ascending</option>
//         <option value="Release Date Decending">Release Date Decending</option>
//         <option value="Release Date Ascending">Release Date Ascending</option>
//         <option value="Title (A-Z)">Title (A-Z)</option>
//       </select>
//       </div>
     
      
      
//     </div>
//   );
// };


import React, { useState } from 'react';

export const TVshow = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const [sortBy, setSortBy] = useState(null);
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const genres = [
    "Action and Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Kids",
    "Mystery",
    "News",
    "Reality",
    "Sci-Fi & Fantasy",
    "Soap",
    "Talk",
    "War & Politics",
    "Western",
  ];

  const sortOptions = [
    "Popularity Decending",
    "Popularity Ascending",
    "Rating Decending",
    "Rating Ascending",
    "Release Date Decending",
    "Release Date Ascending",
    "Title (A-Z)",
  ];

  return (
    <div className='bg-[#08172f] p-4 flex flex-col md:flex-row '>
      <p className='text-white text-xl py-4 mr-2'>Explore TV Shows</p>
      <div className='flex flex-col md:flex-row gap-2'>
        <select onChange={handleGenreChange} value={selectedGenre || ''} className='rounded-xl '>
          <option value="" disabled hidden>Select genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select onChange={handleSortChange} value={sortBy || ''} className='ml-2 rounded-xl py-1'>
          <option value="" disabled hidden>Sort by</option>
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
