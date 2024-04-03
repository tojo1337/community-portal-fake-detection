import { createSlice } from "@reduxjs/toolkit";

export const votedNewsSlice = createSlice({
    name: "VotedNews",
    initialState:{
        value: []
    },
    reducers:{
        // We can add more things like findNews, some sort of sorted list of news
        setNews: (state,action)=>{
            state.value = action.payload;
        },
        addNews: (state,action)=>{
            state.value.push(action.payload);
        }
    }
})

export const {setNews,addNews} = votedNewsSlice.actions;

export default votedNewsSlice.reducer;