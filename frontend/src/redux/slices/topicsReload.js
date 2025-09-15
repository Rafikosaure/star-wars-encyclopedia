import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  reload: false
}

export const topicsReloadSlice = createSlice({
  name: 'topicsReload',
  initialState,
  reducers: {
    reloadTopics: (state, action) => {
      if (!state.reload) {
        state.reload = true
      } else {
        state.reload = false
      }
    }
  }
});

export const { reloadTopics } = topicsReloadSlice.actions;

export const selectReloadTopicsState = (state) => state.topicsReload.reload

export default topicsReloadSlice.reducer;