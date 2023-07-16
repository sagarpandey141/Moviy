import React from 'react'
import TestBtn from '../components/TestBtn'
import { apiConnector } from '../sevices/axios'
import { movieUrls } from '../sevices/urls'

const MoviePage = () => {
 
async function CallMoviesPageAPI(){
    try{
        const response = await apiConnector("GET",movieUrls.TRENDING_MOVIES_IN_WEEK);
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