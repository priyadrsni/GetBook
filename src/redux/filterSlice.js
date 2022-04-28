import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: "all",
    categoryValue: "all",
    genre: "All",
    date: "current",
}

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategory(state, action) {
            state.category = action.payload;
        },
        setCategoryValue(state, action) {
            state.categoryValue = action.payload;
        },
        setGenre(state, action) {
            state.genre = action.payload;
        },
        setDate(state, action) {
            state.date = action.payload;
        }
    }
});

export const { setCategory, setCategoryValue, setDate, setGenre } = filterSlice.actions;
export default filterSlice.reducer;