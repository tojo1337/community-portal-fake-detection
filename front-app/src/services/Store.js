import { configureStore } from "@reduxjs/toolkit";
import VotedNewsReducer from "./VotedNews";
import AuthGuardReducer from "./AuthGuard";

export default configureStore({
    reducer:{
        votedNews: VotedNewsReducer,
        authGuard: AuthGuardReducer,
    }
});