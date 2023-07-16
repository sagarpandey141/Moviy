import React from 'react'
import TestBtn from '../components/TestBtn'
import axios from 'axios'

const MoviePage = () => {
 
async function CallMoviesPageAPI(){
    try{
        const response = await axios.get("https://api.themoviedb.org/3/movie/11" , { headers:{
             Authorization: `Bearer ${import.meta.env.VITE_API_READ_TOKEN}`
           }  ,
        })
        console.log("response by movie url api", response)
    } catch(error){
        console.log("Hi an error is occured" , error)
    }
 }
 

  return (
    <div>
       <div className="text-center">Movie Y</div>
       <TestBtn Click={()=> CallMoviesPageAPI()} />
    </div>
  )
}

export default MoviePage