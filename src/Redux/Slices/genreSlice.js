import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedGenre: [],
    sortBy:"",
}

const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {
        setSelectedGenre(state, action) {
            state.selectedGenre.push(action.payload);
        },
        filterSelectedGenre(state, action) {
        state.selectedGenre = state.selectedGenre.filter((genre) => genre.id != action.payload)
        },
        resetSelectedGenre(state, action) {
            state.selectedGenre = []
        },
        setSortBy(state,action) 
        {
             state.sortBy = action.payload;
        }
    }
});

export const { filterSelectedGenre, setSelectedGenre, resetSelectedGenre ,setSortBy} = genreSlice.actions;
export default genreSlice.reducer