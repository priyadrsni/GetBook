import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedBook: {}
}

const selectedBookSlice = createSlice({
  name: "selectedBook",
  initialState,
  reducers: {
    setSelectedBook(state, action) {
        state.selectedBook = action.payload;
    }
  },
});


export const { setSelectedBook } = selectedBookSlice.actions;

export default selectedBookSlice.reducer;