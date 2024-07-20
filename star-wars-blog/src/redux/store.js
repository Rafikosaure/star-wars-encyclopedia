import { configureStore } from "@reduxjs/toolkit";
import dozenManager from './slices/dozenSlice'
import articleReducer from './slices/articleSlice'
import registerManager from "./slices/registerSlice";
import loggedReducer from './slices/loggedUserSlice';
import loadedReducer from "./slices/loadedUserSlice";
import reloadUsersReducer from "./slices/reloadUsersArray";


export default configureStore({
    reducer: {
        dozenManager: dozenManager,
        article: articleReducer,
        registerValue: registerManager,
        loggedReducer: loggedReducer,
        loadedReducer: loadedReducer,
        reloadUsersArray: reloadUsersReducer
    }
})