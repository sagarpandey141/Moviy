import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import { apiConnector } from '../sevices/axios';
import Card from '../components/Card';

const SearchPage = () => {
    const [searchPage,setSearchPage] = useState(1);
    const [results,setResults] = useState([]);
    
    const location = useLocation();
    console.log(location);
   async function callSearchApi() {
       try{
          const response = await apiConnector("GET",import.meta.env.VITE_BASE_URL+ "/search/multi?query="+ location.pathname.split("/").at(-1)+"&page="+searchPage);
          setResults([...results,...response.data.results])
       } catch(error){
         console.log("error",error)
       }  
    }
    useEffect(() => {
         callSearchApi();
    },[searchPage])    

  return (
    <div className='bg-[#071324] '>
   
    <div className='max-w-4xl mx-auto w-11/12' >
    <div className='italic text-2xl text-gray-400'>Search results ...{} </div>
     <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4 py-3">
      {  
        results.length > 0 ? results.map((data,ind) => (<Card movie={data} key={ind} />)) : (<div>No result</div>)
       }</div>
       </div>
       </div>
  )
}

export default SearchPage