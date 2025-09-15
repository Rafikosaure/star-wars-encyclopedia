import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

export const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    updateUserLog: (state, action) => {
        state.value = action.payload
    }
  }
});

export const { updateUserLog } = loggedUserSlice.actions;

export const selectLoggedUser = (state) => state.userLogReducer.value

export default loggedUserSlice.reducer;

