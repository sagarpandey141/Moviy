import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    page: 1,
    results: [],
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
    }
});

export const { setLoading,setResults, setPageIncrement, resetPageAndResults } = movieSlice.actions;
export default movieSlice.reducer