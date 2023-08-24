import React, { useEffect,useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { apiConnector } from '../sevices/axios';
import Card from '../components/Card';
import { isAtbottom } from '../utils/isAtBottom';

const SearchPage = () => {
  const [searchPage,setSearchPage] = useState(1);
  const [results,setResults] = useState([]);
  const {searchName} = useParams();
   async function callSearchApi() {
       try{
          const response = await apiConnector("GET",import.meta.env.VITE_BASE_URL+ "/search/multi?query="+searchName+"&page="+searchPage);
          // console.log("search",response)
          if(response.data.total_pages >= searchPage)
          setResults([...results,...response.data.results])
          else{
             console.log("first",flag)
             setflag(false);
          }
       } catch(error){
         console.log("error",error)
       }  
    }
    useEffect(() => {
         callSearchApi();
    },[searchPage])

    function handleScrollEvent(){
      if (isAtbottom()) 
       {setSearchPage(searchPage => searchPage + 1)}
    }

    useEffect(() => {
       window.addEventListener("scroll",handleScrollEvent)
       return () => window.removeEventListener("scroll",handleScrollEvent)
    },[])

  return (
    <div className='bg-[#08172f] pt-20'>
    
    <div className='max-w-4xl mx-auto w-11/12' >
    <div className='italic text-2xl text-gray-400'>Search results of <span className='capitalize not-italic decoration-sky-500 underline text-white underline-offset-8 '>{searchName}</span> </div>
     <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4 py-3">
      {  
        results.length > 0 ? results.map((data,ind) => (<Card movie={data} key={ind} />)) : (<div>No result</div>)
       }</div>
       </div>
       </div>
  )
}

export default SearchPage