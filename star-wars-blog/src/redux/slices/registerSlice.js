import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  boolValue: false
}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    updateRegisterState: (state, action) => {
      state.boolValue = action.payload
    }
  }
});

export const { updateRegisterState } = registerSlice.actions;

export const selectRegisterState = (state) => state.registerValue.boolValue

export default registerSlice.reducer;

