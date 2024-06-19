import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    saveAnArticle: (state, action) => {
        state.value = action.payload
        console.log(state.value)
    }
  }
});

export const { saveAnArticle } = articleSlice.actions;

export const selectArticle = (state) => state.article

export default articleSlice.reducer;

