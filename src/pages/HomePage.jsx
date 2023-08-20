import React from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../sevices/axios";
import ThrTab from "../components/ThrTab";

const HomePage = ({searchWord,setSearchWord}) => {
    const navigate = useNavigate();
    function handleSearch(keyword) {
        if(keyword != ""){
             navigate(`/search/${keyword}`)
        }  
    }

async function backImages(){
   try{
      const response = await apiConnector("GET","https://api.themoviedb.org/3/trending/movie/week");

   }catch(error){
     
   }

}

  return (
    <div className="bg-[#08172f]">
    {/* bg image */}
     <div className="relative  ">
     <div className="absolute inset-0">
     </div>
      <div className="max-w-4xl h-[700px] mx-auto relative flex justify-center items-center w-11/12">
          <div className="flex flex-col w-full items-center">
               <h1 className="text-7xl text-white bold font-bold">Welcome.</h1>
               <p className=" text-center text-xl text-gray-400">Millions of movies, TV shows and people to discover. Explore now.</p>
               <div className="flex text-lg mt-10 max-w-xl w-10/12 ">
               <input type="text" value={searchWord} onChange={(e) => 
                  setSearchWord(e.target.value)
                  
               }
                  onKeyDown={(e) =>{
                     if(e.key == "Enter"){
                       handleSearch(searchWord)
                     }
                   } 
                  } className="focus:outline-none rounded-l-full w-full py-2 px-6 text-gray-500" placeholder="Search for a movie or tv show..." />
               <button onClick={() => {
                handleSearch(searchWord);
               }} className="py-2 text-base px-5 rounded-r-full bg-gradient-to-r text-gray-100 from-yellow-500 to-pink-500">Search</button>
               </div>
          </div>
      </div>
      {/* inset 0 absolute */}
      
     </div>

     {/* sagar write your code below this line */}
      <ThrTab/>
    </div>
  );
};

export default HomePage;
