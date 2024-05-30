import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logged: false
}

export const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    updateLoggedUser: (state, action) => {
      if (state.logged) {
        state.logged = false
      } else {
        state.logged = true
      }
    }
  }
});

export const { updateLoggedUser } = loggedUserSlice.actions;

export const selectloggedUserState = (state) => state.loggedReducer.logged

export default loggedUserSlice.reducer;

