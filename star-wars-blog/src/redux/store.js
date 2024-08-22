import { configureStore } from "@reduxjs/toolkit";
import dozenManager from './slices/dozenSlice'
import articleReducer from './slices/articleSlice'
import registerManager from "./slices/registerSlice";
import isLoggedReducer from './slices/isLoggedUserSlice';
import loadedReducer from "./slices/loadedUserSlice";
import reloadUsersReducer from "./slices/reloadUsersArray";
import userLogReducer from './slices/loggedUserSlice';
import topicsReloadReducer from './slices/topicsReload';
import citationReducer from './slices/citationSlice';
import postsReloadReducer from "./slices/postsReload";


export default configureStore({
    reducer: {
        dozenManager: dozenManager,
        article: articleReducer,
        registerValue: registerManager,
        isLoggedReducer: isLoggedReducer,
        loadedReducer: loadedReducer,
        reloadUsersArray: reloadUsersReducer,
        userLogReducer: userLogReducer,
        topicsReload: topicsReloadReducer,
        citation: citationReducer,
        postsReload: postsReloadReducer
    }
})