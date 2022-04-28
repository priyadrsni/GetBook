import bestSellersSlice from "./bestSellersSlice";
import selectedBookSlice from "./selectedBookSlice";
import { configureStore } from '@reduxjs/toolkit';
import filterSlice from "./filterSlice";
import loaderSlice from "./loaderSlice";

const reducer = {
    books: bestSellersSlice, 
    selectedBook: selectedBookSlice,
    filters: filterSlice,
    loader: loaderSlice
}
const store = configureStore({reducer});

export default store;