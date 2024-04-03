import { createSlice } from "@reduxjs/toolkit";

export const unvotedNews = createSlice({
    name: "UnvotedNews",
    initialState:{
        value: []
    },
    reducers:{
        setNews: (state,action)=>{
            state.value = action.payload;
        },
        addNews: (state,action)=>{
            state.value.push(action.payload);
        }
    }
})