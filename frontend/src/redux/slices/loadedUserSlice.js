import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  loaded: false
}

export const loadedUserSlice = createSlice({
  name: 'loadedUser',
  initialState,
  reducers: {
    updateLoadedUser: (state, action) => {
      state.loaded = action.payload
    }
  }
});

export const { updateLoadedUser } = loadedUserSlice.actions;

export const selectLoadedState = (state) => state.loadedReducer.loaded

export default loadedUserSlice.reducer;

