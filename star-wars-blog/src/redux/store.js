import { configureStore } from "@reduxjs/toolkit";
import dozenManager from './slices/dozenSlice'
import articleReducer from './slices/articleSlice'
import registerManager from "./slices/registerSlice";
import isLoggedReducer from './slices/isLoggedUserSlice';
import loadedReducer from "./slices/loadedUserSlice";
import reloadUsersReducer from "./slices/reloadUsersArray";
import forumDataReducer from './slices/forumSlice';
import topicsDataReducer from './slices/topicSlice'
import userLogReducer from './slices/loggedUserSlice'


export default configureStore({
    reducer: {
        dozenManager: dozenManager,
        article: articleReducer,
        registerValue: registerManager,
        isLoggedReducer: isLoggedReducer,
        loadedReducer: loadedReducer,
        reloadUsersArray: reloadUsersReducer,
        forumDataReducer: forumDataReducer,
        topicsDataReducer: topicsDataReducer,
        userLogReducer: userLogReducer
    }
})