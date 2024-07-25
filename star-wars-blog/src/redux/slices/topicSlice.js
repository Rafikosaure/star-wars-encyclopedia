import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

export const topicSlice = createSlice({
  name: 'topicData',
  initialState,
  reducers: {
    saveTopicData: (state, action) => {
        state.value = action.payload
    }
  }
});

export const { saveTopicData } = topicSlice.actions;

export const selectTopicData = (state) => state.topicDataReducer.value

export default topicSlice.reducer;