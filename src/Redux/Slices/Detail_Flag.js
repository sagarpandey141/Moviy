import { createSlice } from "@reduxjs/toolkit";


const initialState = {
     flag:false
}

const DetailFlag = createSlice({
    name: "DetailFlag",
    initialState,
    reducers: {
       setFlag(state,actions){
        state.flag=actions.payload
       }
    }
});

export const {setFlag} = DetailFlag.actions;
export default DetailFlag.reducer