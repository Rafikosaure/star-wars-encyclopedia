import { configureStore } from "@reduxjs/toolkit";
import dozenManager from './slices/dozenSlice'
import articleReducer from './slices/articleSlice'
import registerManager from "./slices/registerSlice";


export default configureStore({
    reducer: {
        dozenManager: dozenManager,
        article: articleReducer,
        registerValue: registerManager
    }
})