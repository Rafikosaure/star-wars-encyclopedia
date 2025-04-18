import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  productsArray: []
}


export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    saveProducts: (state, action) => {
      state.productsArray = action.payload
    }
  }
});

export const { saveProducts } = productsSlice.actions;

export const selectProducts = (state) => state.productsReducer.productsArray

export default productsSlice.reducer;