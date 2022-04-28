import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
}

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        toggleLoader(state) {
            state.isLoading = !state.isLoading;
        }
    }
})

export const { toggleLoader } = loaderSlice.actions;
export default loaderSlice.reducer;