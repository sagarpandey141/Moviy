import React,{useState,useEffect,useRef} from 'react'
import {ArrowDropDown,CancelRounded} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../Redux/Slices/genreSlice';
import { resetPageAndResults } from '../Redux/Slices/movieSlice';


const Select = ({placeHolder,options}) => {
    const [showDropDown,setShowDropDown] = useState(false);
    const dispatch = useDispatch();
    const {sortBy} = useSelector(state => state.genre)

    const ref = useRef();

    useEffect(() => {
        const checkIfClickedOutside = e => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
          if (setShowDropDown && ref.current && !ref.current.contains(e.target)) {
            setShowDropDown(false)
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [showDropDown])
// correction is pending

  return (
        <div className=' lg:max-w-xl  min-w-[300px] bg-blue-950 rounded-full' ref={ref} >
          <div className=' border-black px-2 py-1 relative '>
            <div className='flex justify-between '>
              <div className='flex justify-between flex-grow' >
               { sortBy != "" ? `${sortBy}` : placeHolder }
              { sortBy != "" && <CancelRounded onClick= { (e) => {
                    e.stopPropagation();
                    dispatch(resetPageAndResults());
                    dispatch(setSortBy(""))
                    } }  />}
              </div>
              <div className='flex gap-2'>
                <div className='w-[1px] bg-white'></div>
                <div onClick={() => {
                  setShowDropDown(!showDropDown)
                  // drop down
                }}>
                  <ArrowDropDown />
                </div>
              </div>
            </div>
              {/* drop down box */}
            {showDropDown && <div className='h-fit  absolute w-full bg-white left-0 text-black z-10 top-10 p-2 '>
              {
                options.map((option,index) => (<div className='cursor-pointer hover:bg-slate-100' key={index} onClick= { () => {
                    dispatch(resetPageAndResults());
                    dispatch(setSortBy(option.value))
                    } } >
                  {option.name}
                </div>))
              }
            </div>}
          </div>
        </div>
      )
}

export default Select