import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  products: []
}


export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    saveProduct: (state, action) => {
      state.products = [...state.products, action.payload]
    },
    removeProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id)
      if (index !== -1) {
        state.products.splice(index, 1)
      }
    },
    emptyBasket: (state, action) => {
      state.products = []
    }
  }
});

export const { saveProduct, removeProduct, emptyBasket } = basketSlice.actions;

export const selectBasket = (state) => state.basketReducer.products

export default basketSlice.reducer;