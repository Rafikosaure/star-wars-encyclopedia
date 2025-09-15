import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
    topicId: ''
}

const topicDozenManagerSlice = createSlice({
    name: "topicDozenManager",
    initialState: { value: initialState },
    reducers: {
        setCurrentTopicDozen: (state, action) => {
            state.value.currentPage = action.payload.currentPage
            state.value.topicId = action.payload.topicId
        }
    }
})

export const { setCurrentTopicDozen } = topicDozenManagerSlice.actions

export const selectTopicDozen = (state) => state.topicDozenManager

export default topicDozenManagerSlice.reducer