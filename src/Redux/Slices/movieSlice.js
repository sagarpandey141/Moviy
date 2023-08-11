import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    page: 1,
    results: [],
    urls:[]
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setPageIncrement(state, action) {
            state.page = state.page + 1;
        },
        resetPageAndResults(state,action)
        {
           state.page = 1; 
           state.results = [];  
        },
        setResults(state, action) {
            state.results = [...state.results, ...action.payload];
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setUrls(state,action){
            state.urls = [...state.urls,action.payload];
        },
        resetUrls(state,action){
             state.urls = [];
        }
    }
});

export const { setLoading,setResults, setPageIncrement, resetPageAndResults,setUrls,resetUrls } = movieSlice.actions;
export default movieSlice.reducer