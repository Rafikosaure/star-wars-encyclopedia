import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  reload: false
}

export const postsReloadSlice = createSlice({
  name: 'postsReload',
  initialState,
  reducers: {
    reloadPosts: (state, action) => {
      if (!state.reload) {
        state.reload = true
      } else {
        state.reload = false
      }
    }
  }
});

export const { reloadPosts } = postsReloadSlice.actions;

export const selectReloadPostsState = (state) => state.postsReload.reload

export default postsReloadSlice.reducer;