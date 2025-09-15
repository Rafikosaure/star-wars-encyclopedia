import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lastCategoryId: 'f6def03b-7818-4951-9d8a-afbe17aa205b'
}

export const lastCategoryIdSlice = createSlice({
  name: 'lastCategory',
  initialState,
  reducers: {
    memorizeLastCategoryId: (state, action) => {
        state.lastCategoryId = action.payload
    }
  }
});

export const { memorizeLastCategoryId } = lastCategoryIdSlice.actions;

export const selectLastCategoryId = (state) => state.lastCategory.lastCategoryId

export default lastCategoryIdSlice.reducer;

