import bestSellersSlice from "./bestSellersSlice";
import selectedBookSlice from "./selectedBookSlice";
import { configureStore } from '@reduxjs/toolkit';

const reducer = {
    bestSellers: bestSellersSlice, 
    selectedBook: selectedBookSlice
}
const store = configureStore({reducer});


export default store;