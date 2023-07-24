import { ArrowDropDown, CancelOutlined, CancelRounded } from '@mui/icons-material'
import React, { useState,useRef,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedGenre,resetSelectedGenre,filterSelectedGenre } from '../Redux/Slices/genreSlice';
import { resetPageAndResults } from '../Redux/Slices/movieSlice';

const CustomSelect = ({Genre}) => {
  const dispatch = useDispatch();
  const {selectedGenre} = useSelector((state) => state.genre)
  const ref = useRef()

  const [showGenre, setShowGenre] = useState(false);
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (setShowGenre && ref.current && !ref.current.contains(e.target)) {
        setShowGenre(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [showGenre])

  

  function isGenreAlreadySelected(genreID, genreArray) {
    // console.log(genreArray)
    for (let x of genreArray) {
      if (x.id === genreID)
        return true
    }
    return false;
  }
  function pushToChooseGenre(value) {
    if (!isGenreAlreadySelected(value.id, selectedGenre))
    {

     dispatch(resetPageAndResults())
     dispatch(setSelectedGenre(value));
    }
  }
  return (
    <div className=' lg:max-w-xl  min-w-[350px]' ref={ref}>
      <div className='border text-white px-2 relative'>
        <div className='flex justify-between items-center'>
          <div className=''>
            {selectedGenre.length > 0 ? (<div className='flex gap-1 flex-wrap'>
              {
                selectedGenre.map((genre, index) => (<div key={index} className='bg-yellow-500 flex items-center flex-nowrap gap-2 text-xs'>
                  {genre.name}
                  <div onClick={() => {
                    dispatch(resetPageAndResults())
                    dispatch(filterSelectedGenre(genre.id))
                  }}><CancelOutlined /></div>
                </div>))
              }
            </div>) : "Select Genres"}
          </div>
          <div className='flex gap-2'>
            {selectedGenre.length > 0 &&
              <div onClick={() => {
                dispatch(resetPageAndResults())
                dispatch(resetSelectedGenre());
              }}>
                <CancelRounded />
              </div>}
            <div className='w-[1px] bg-white'></div>
            <div onClick={() => {
              setShowGenre(!showGenre)
              // drop down
            }}>
              <ArrowDropDown />
            </div>
          </div>
        </div>
          {/* drop down box */}
        {showGenre && <div className='h-[150px] overflow-auto absolute w-full bg-white left-0 text-black z-10'>
          {
            Genre.map((genre) => (<div className='cursor-pointer hover:bg-slate-100' key={genre.id} onClick={() => pushToChooseGenre(genre)} >
              {genre.name}
            </div>))
          }
        </div>}
      </div>
    </div>
  )
}

export default CustomSelect