import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
       <div className='max-w-7xl w-11/12 mx-auto flex justify-between py-4 items-center'>
          
          <div className='text-2xl '>Movie Y</div>
          <div className='flex gap-4 '>
             <Link to="/movies"><div className='hover:text-pink-700'>Movies</div></Link>
             <div className='hover:text-pink-700'>TV</div>
             <SearchIcon className='hover:text-pink-700' />
          </div>

       </div>
    </div>
  )
}

export default Header