import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1
}

const shoppingPaginateManagerSlice = createSlice({
    name: "shoppingPaginateManager",
    initialState: { value: initialState },
    reducers: {
        setCurrentShoppingPage: (state, action) => {
            state.value.currentPage = action.payload
        }
    }
})

export const { setCurrentShoppingPage } = shoppingPaginateManagerSlice.actions

export const selectShoppingPage = (state) => state.shoppingPageReducer.value.currentPage

export default shoppingPaginateManagerSlice.reducer