import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

export const topicsSlice = createSlice({
  name: 'topicsData',
  initialState,
  reducers: {
    saveTopicsData: (state, action) => {
        state.value = action.payload
    }
  }
});

export const { saveTopicsData } = topicsSlice.actions;

export const selectTopicsData = (state) => state.topicsDataReducer.value

export default topicsSlice.reducer;