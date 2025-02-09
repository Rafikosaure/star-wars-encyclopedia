import { configureStore } from "@reduxjs/toolkit";
import dozenManager from './slices/dozenSlice'
import topicDozenManager from './slices/topicDozenSlice'
import articlesArrayReducer from './slices/articlesArraySlice'
import registerManager from "./slices/registerSlice";
import isLoggedReducer from './slices/isLoggedUserSlice';
import loadedReducer from "./slices/loadedUserSlice";
import reloadUsersReducer from "./slices/reloadUsersArray";
import userLogReducer from './slices/loggedUserSlice';
import topicsReloadReducer from './slices/topicsReload';
import citationReducer from './slices/citationSlice';
import commentCitationReducer from "./slices/commentCitationSlice";
import postsReloadReducer from "./slices/postsReload";
import followedTopicsReloadReducer from './slices/followedTopicsReload'


export default configureStore({
    reducer: {
        dozenManager: dozenManager,
        topicDozenManager: topicDozenManager,
        articlesArray: articlesArrayReducer,
        registerValue: registerManager,
        isLoggedReducer: isLoggedReducer,
        loadedReducer: loadedReducer,
        reloadUsersArray: reloadUsersReducer,
        userLogReducer: userLogReducer,
        topicsReload: topicsReloadReducer,
        citation: citationReducer,
        commentCitation: commentCitationReducer,
        postsReload: postsReloadReducer,
        followedTopicsReload: followedTopicsReloadReducer
    }
})