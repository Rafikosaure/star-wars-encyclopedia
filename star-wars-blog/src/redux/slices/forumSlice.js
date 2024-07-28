import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

export const forumSlice = createSlice({
  name: 'forumData',
  initialState,
  reducers: {
    saveForumData: (state, action) => {
        state.value = action.payload
    }
  }
});

export const { saveForumData } = forumSlice.actions;

export const selectForumData = (state) => state.forumDataReducer.value

export default forumSlice.reducer;