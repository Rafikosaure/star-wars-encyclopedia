import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  reload: false
}

export const reloadUsersSlice = createSlice({
  name: 'reloadUsersArray',
  initialState,
  reducers: {
    reloadUsersArrayFunction: (state, action) => {
      if (state.reload) {
        state.reload = false
      } else {
        state.reload = true
      }
    }
  }
});

export const { reloadUsersArrayFunction } = reloadUsersSlice.actions;

export const selectReloadUsersState = (state) => state.reloadUsersArray.reload

export default reloadUsersSlice.reducer;