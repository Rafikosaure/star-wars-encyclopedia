import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  logged: false
}

export const isLoggedUserSlice = createSlice({
  name: 'isLoggedUser',
  initialState,
  reducers: {
    updateIsLoggedUser: (state, action) => {
      state.logged = action.payload
    }
  }
});

export const { updateIsLoggedUser } = isLoggedUserSlice.actions;

export const selectIsLoggedState = (state) => state.isLoggedReducer.logged

export default isLoggedUserSlice.reducer;

