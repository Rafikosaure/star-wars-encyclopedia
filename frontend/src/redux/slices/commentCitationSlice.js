import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postId: undefined,
  authorId: undefined,
  text: undefined
}

export const commentCitationSlice = createSlice({
  name: 'commentCitation',
  initialState,
  reducers: {
    saveACommentCitation: (state, action) => {
      state.postId = action.payload.postId
      state.authorId = action.payload.authorId
      state.text = action.payload.text
    },
    reinitializeCommentCitation: (state, action) => {
      state.postId = undefined
      state.authorId = undefined
      state.text = undefined
    }
  }
});

export const { saveACommentCitation, reinitializeCommentCitation } = commentCitationSlice.actions;

export const selectCommentCitation = (state) => state.commentCitation

export default commentCitationSlice.reducer;

