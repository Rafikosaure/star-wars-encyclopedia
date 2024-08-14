import { configureStore } from "@reduxjs/toolkit";
import dozenManager from './slices/dozenSlice'
import articleReducer from './slices/articleSlice'
import registerManager from "./slices/registerSlice";
import isLoggedReducer from './slices/isLoggedUserSlice';
import loadedReducer from "./slices/loadedUserSlice";
import reloadUsersReducer from "./slices/reloadUsersArray";
import userLogReducer from './slices/loggedUserSlice';
import forumDataReloadReducer from './slices/forumDataReload';


export default configureStore({
    reducer: {
        dozenManager: dozenManager,
        article: articleReducer,
        registerValue: registerManager,
        isLoggedReducer: isLoggedReducer,
        loadedReducer: loadedReducer,
        reloadUsersArray: reloadUsersReducer,
        userLogReducer: userLogReducer,
        forumDataReload: forumDataReloadReducer
    }
})