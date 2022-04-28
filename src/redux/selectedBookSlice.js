import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: {},
  reviews: []
}

const selectedBookSlice = createSlice({
  name: "selectedBook",
  initialState,
  reducers: {
    setSelectedBook(state, action) {
        state.book = action.payload;
    },
    setReviews(state, action) {
      state.reviews = action.payload
    }
  },
});


export const { setSelectedBook, setReviews } = selectedBookSlice.actions;

export default selectedBookSlice.reducer;