import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  reload: false
}

export const forumDataReloadSlice = createSlice({
  name: 'forumDataReload',
  initialState,
  reducers: {
    reloadForumData: (state, action) => {
      state.reload = action.payload
    }
  }
});

export const { reloadForumData } = forumDataReloadSlice.actions;

export const selectReloadForumDataState = (state) => state.forumDataReload.reload

export default forumDataReloadSlice.reducer;