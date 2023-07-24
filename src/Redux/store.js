import { configureStore } from "@reduxjs/toolkit";
import movieSliceReducer from "./Slices/movieSlice"
import genreSlice from "./Slices/genreSlice";

const store = configureStore({
     reducer:{
          movie:movieSliceReducer,
          genre:genreSlice,
     }
})

export default store