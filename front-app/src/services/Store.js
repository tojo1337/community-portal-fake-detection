import { configureStore } from "@reduxjs/toolkit";
import AuthGuardReducer from "./AuthGuard";
import NewsReducer from "./News";

export default configureStore({
    reducer:{
        news: NewsReducer,
        authGuard: AuthGuardReducer,
    }
});