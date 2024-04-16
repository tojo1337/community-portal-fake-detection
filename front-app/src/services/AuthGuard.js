import { createSlice } from "@reduxjs/toolkit";

const undefinedState = {
    isAuthenticated: false,
    bearerToken: "",
    user: "",
    admin: false
};

const storedCred = localStorage.getItem("creds") !== null ? JSON.parse(localStorage.getItem("creds")) : undefinedState;

const basicCred = {
    isAuthenticated: storedCred.isAuthenticated,
    bearerToken: storedCred.bearerToken,
    user: storedCred.user,
    admin: storedCred.admin
};

export const authGuard = createSlice({
    name: "AuthGuard",
    initialState: basicCred,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.bearerToken = action.payload;
            localStorage.setItem("creds", JSON.stringify(state));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.bearerToken = "";
            state.user = "";
            state.admin = false;
            localStorage.setItem("creds", JSON.stringify(state));
        },
        refresh: (state, action) => {
            state.isAuthenticated = true;
            state.bearerToken = action.payload;
            localStorage.setItem("creds", JSON.stringify(state));
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("creds", JSON.stringify(state));
        },
        setAdmin: (state,action) => {
            state.admin = action.payload;
            localStorage.setItem("creds", JSON.stringify(state));
        }
    }
});

export const { login, logout, refresh, setUser, setAdmin } = authGuard.actions;

export default authGuard.reducer;