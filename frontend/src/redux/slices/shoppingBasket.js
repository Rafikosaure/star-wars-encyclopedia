import { createSlice } from '@reduxjs/toolkit';
import { 
  loadBasketFromLocalStorage, 
  saveBasketToLocalStorage,
  clearBasketFromLocalStorage 
} from '../../utils/basketLocalStorage';



const initialState = {
  items: loadBasketFromLocalStorage() || []
};


export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    saveProduct: (state, action) => {
      const { id, maxQuantity } = action.payload;

      // Vérifier si le produit est déjà dans le panier
      const existingItem = state.items.find(item => item.id === id);

      // Si le produit existe déjà, on vérifie la limite de stock
      if (existingItem) {
        if (!maxQuantity || existingItem.quantity < maxQuantity) {

          // Si c'est bon, on incrémente la quantité
          existingItem.quantity += 1;
        }

        // Sinon : ne pas dépasser le stock, on ne fait rien
      } else {
        state.items.push({ id, quantity: 1 });
      }

      // On sauvegarde dans le localStorage
      saveBasketToLocalStorage(state.items);
    },
    removeProduct: (state, action) => {
      const idToRemove = action.payload.id;
      const existingItem = state.items.find(item => item.id === idToRemove);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // Si quantité = 1, on supprime l’entrée
          state.items = state.items.filter(item => item.id !== idToRemove);
        }

        // On sauvegarde dans le localStorage
        saveBasketToLocalStorage(state.items);
      }
    },
    emptyBasket: (state, action) => {
      state.items = []

      // Supprimer complètement du localStorage
      clearBasketFromLocalStorage();
    }
  }
});

export const { saveProduct, removeProduct, emptyBasket } = basketSlice.actions;

export const selectBasket = (state) => state.basketReducer.items

export default basketSlice.reducer;