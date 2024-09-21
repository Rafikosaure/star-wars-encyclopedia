import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authorId: undefined,
  text: undefined
}

export const commentCitationSlice = createSlice({
  name: 'commentCitation',
  initialState,
  reducers: {
    saveACommentCitation: (state, action) => {
      state.authorId = action.payload.authorId
      state.text = action.payload.text
    },
    reinitializeCommentCitation: (state, action) => {
      state.authorId = undefined
      state.text = undefined
    }
  }
});

export const { saveACommentCitation, reinitializeCommentCitation } = commentCitationSlice.actions;

export const selectCommentCitation = (state) => state.commentCitation

export default commentCitationSlice.reducer;

