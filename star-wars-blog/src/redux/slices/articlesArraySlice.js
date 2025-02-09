import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: []
}

export const articlesArraySlice = createSlice({
  name: 'articlesArray',
  initialState,
  reducers: {
    saveArticlesArray: (state, action) => {
      state.articles = action.payload
    }
  }
});

export const { saveArticlesArray } = articlesArraySlice.actions;

export const selectArticlesArray = (state) => state.articlesArray.articles

export default articlesArraySlice.reducer;

