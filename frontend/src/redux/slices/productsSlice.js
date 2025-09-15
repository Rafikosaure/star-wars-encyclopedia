// redux/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ShoppingServices } from '../../api/api-shopping.js';
import { formateApiData } from '../../utils/shoppingUtils';

// createAsyncThunk permet de déclencher l'appel à l'API
export const fetchProducts = createAsyncThunk(
  'shoppingData/fetch',
  async () => {
    const rawData = await ShoppingServices.getProductsToSell();
    const formatted = formateApiData(rawData);
    return formatted;
  }
);

const initialState = {
  productsArray: [],
  status: 'idle', // "idle" | "loading" | "succeeded" | "failed"
  error: null
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}, // on utilise les extraReducers pour fetch async
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productsArray = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const selectProducts = (state) => state.productsReducer.productsArray;
export const selectProductsStatus = (state) => state.productsReducer.status;
export const selectProductsError = (state) => state.productsReducer.error;

export default productsSlice.reducer;