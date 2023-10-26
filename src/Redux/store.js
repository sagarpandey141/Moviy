import { configureStore } from "@reduxjs/toolkit";
import movieSliceReducer from "./Slices/movieSlice"
import genreSlice from "./Slices/genreSlice";
import TvSlice from "./Slices/TvSlice";
import Tvgenre from "./Slices/genreTvSlice" 
const store = configureStore({
     reducer:{
          movie:movieSliceReducer,
          genre:genreSlice,
          Tvgenre:Tvgenre,
          tv:TvSlice
     }
})

export default store