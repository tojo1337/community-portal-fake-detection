import { createSlice } from "@reduxjs/toolkit";

export const news = createSlice({
    name: "News",
    initialState: {
        value: []
    },
    reducers: {
        setNews: (state,action)=>{
            state.value = action.payload;
        },
    }
});

export const {setNews} = news.actions;

export default news.reducer;