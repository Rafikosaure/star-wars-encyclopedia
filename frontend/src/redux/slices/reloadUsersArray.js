import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  reload: false
}

export const reloadUsersSlice = createSlice({
  name: 'reloadUsersArray',
  initialState,
  reducers: {
    reloadUsersArrayFunction: (state, action) => {
      state.reload = action.payload
    }
  }
});

export const { reloadUsersArrayFunction } = reloadUsersSlice.actions;

export const selectReloadUsersState = (state) => state.reloadUsersArray.reload

export default reloadUsersSlice.reducer;