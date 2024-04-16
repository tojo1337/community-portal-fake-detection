import { createSlice } from "@reduxjs/toolkit";

const newsArr = localStorage.getItem("newsdb")===null ? []: JSON.parse(localStorage.getItem("newsdb"));

export const news = createSlice({
    name: "News",
    initialState: {
        value: newsArr
    },
    reducers: {
        setNews: (state,action)=>{
            state.value = action.payload;
            localStorage.setItem("newsdb",JSON.stringify(state.value));
        },
        addNews: (state,action)=>{
            let newsArr = [...state.value];
            newsArr.push(action.payload);
            state.value = newsArr;
            console.log(action.payload);
            localStorage.setItem("newsdb",JSON.stringify(state.value));
        },
    }
});

export const {setNews,addNews} = news.actions;

export default news.reducer;