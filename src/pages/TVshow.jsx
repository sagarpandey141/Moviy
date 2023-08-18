

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
