import { createSlice } from "@reduxjs/toolkit";

const initialState = 1

const dozenManagerSlice = createSlice({
    name: "dozenManager",
    initialState: { value: initialState },
    reducers: {
        reinitializeDozen: (state, action) => {
            state.value = 1
        },
        nextDozen: (state, action) => {
            state.value = state.value + 1
            // console.log('Nextdozen :', state.value)
        },
        prevDozen: (state, action) => {
            state.value = state.value - 1
            // console.log('PrevDozen :', state.value)
        },
        maxDozen: (state, action) => {
            state.value = action.payload
            // console.log('MaxDozen :', action.payload)
        }
    }
})

export const { reinitializeDozen, nextDozen, prevDozen, maxDozen } = dozenManagerSlice.actions

export const selectDozen = (state) => state.dozenManager.value

export default dozenManagerSlice.reducer