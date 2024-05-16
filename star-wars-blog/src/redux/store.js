import { configureStore } from "@reduxjs/toolkit";
import dozenManager from './slices/dozenSlice'
import articleReducer from './slices/articleSlice'

export default configureStore({
    reducer: {
        dozenManager: dozenManager,
        article: articleReducer
    }
})