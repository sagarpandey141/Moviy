import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='fixed z-50 w-screen bg-[#071324] text-white bg-opacity-70 backdrop-blur-sm'>
       <div className='max-w-4xl w-11/12 mx-auto flex justify-between py-3 items-center'>
          
          <Link to="/"><div className='text-xl'>Movie Y</div></Link>
          <div className='flex gap-6 text-md'>
             <Link to="/movies"><div className='hover:text-pink-700'>Movies</div></Link>
             <Link to="/tvshow"><div className='hover:text-pink-700'>TV</div></Link>
             <SearchIcon className='hover:text-pink-700' />
          </div>

       </div>
    </div>
  )
 
}

export default Header