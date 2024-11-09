import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  reload: false
}

export const followedTopicsReloadSlice = createSlice({
  name: 'followedTopicsReload',
  initialState,
  reducers: {
    reloadFollowedTopics: (state, action) => {
      if (!state.reload) {
        state.reload = true
      } else {
        state.reload = false
      }
    }
  }
});

export const { reloadFollowedTopics } = followedTopicsReloadSlice.actions;

export const selectReloadFollowedTopicsState = (state) => state.followedTopicsReload.reload

export default followedTopicsReloadSlice.reducer;