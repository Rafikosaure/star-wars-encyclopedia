import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authorId: undefined,
  text: undefined
}

export const citationSlice = createSlice({
  name: 'citation',
  initialState,
  reducers: {
    saveACitation: (state, action) => {
      state.authorId = action.payload.authorId
      state.text = action.payload.text
    },
    reinitializeCitation: (state, action) => {
      state.authorId = undefined
      state.text = undefined
    }
  }
});

export const { saveACitation, reinitializeCitation } = citationSlice.actions;

export const selectCitation = (state) => state.citation

export default citationSlice.reducer;

