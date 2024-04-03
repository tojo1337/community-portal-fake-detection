import { createSlice } from "@reduxjs/toolkit";

export const authGuard = createSlice({
    name: "AuthGuard",
    initialState:{
        isAuthenticated: false,
        bearerToken: "",
        user: "",
    },
    reducers:{
        login: (state,action)=>{
            state.isAuthenticated = true;
            state.bearerToken = action.payload;
        },
        logout: (state)=>{
            state.isAuthenticated = false;
            state.bearerToken = "";
        },
        refresh: (state,action)=>{
            state.isAuthenticated = true;
            state.bearerToken = action.payload;
        },
        setUser: (state,action)=>{
            state.user = action.payload;
        }
    }
});

export const {login,logout,refresh,setUser} = authGuard.actions;

export default authGuard.reducer;