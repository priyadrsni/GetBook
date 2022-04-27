import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bestSellers: [],
    bestSellerOptions: [],
    bestSellersByDate: [],
    booksToBeDisplayed: [],
}

const bestSellersSlice = createSlice({
  name: "bestSellers",
  initialState,
  reducers: {
    setBestSellers(state, action) {
        state.bestSellers = action.payload;
    },
    setBestSellerOptions(state, action) {
        state.bestSellerOptions = action.payload;
    },
    setBestSellersByDate(state, action) {
        state.bestSellersByDate = action.payload;
    },
    setBooksToBeDisplayed(state, action) {
        state.booksToBeDisplayed = action.payload;
    }
  },
});


export const { setBestSellers, setBestSellerOptions, setBestSellersByDate, setBooksToBeDisplayed } = bestSellersSlice.actions;

export default bestSellersSlice.reducer;