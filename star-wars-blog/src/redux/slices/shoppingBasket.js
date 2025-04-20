import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  products: []
}


export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    saveProduct: (state, action) => {
      const productToAdd = action.payload;

      // Compter combien de fois ce produit est déjà présent dans le panier
      const currentCount = state.products.reduce((acc, item) => {
        return item.id === productToAdd.id ? acc + 1 : acc;
      }, 0);

      // Vérifier la limite de stock
      if (productToAdd.maxQuantity && currentCount >= productToAdd.maxQuantity) {
        return; // On empêche l'ajout
      }

      // Sinon, on ajoute le produit
      state.products.push(productToAdd);
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