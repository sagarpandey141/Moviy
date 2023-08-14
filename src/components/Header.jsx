import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='  bg-[#071324] text-white '>
       <div className='max-w-4xl w-11/12 mx-auto flex justify-between py-4 items-center'>
          
          <Link to="/"><div className='text-2xl'>Movie Y</div></Link>
          <div className='flex gap-4 '>
             <Link to="/movies"><div className='hover:text-pink-700'>Movies</div></Link>
             <Link to="/tvshow"><div className='hover:text-pink-700'>TV</div></Link>
             <SearchIcon className='hover:text-pink-700' />
          </div>

       </div>
    </div>
  )
}

export default Header