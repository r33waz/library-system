import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/auth.slice";
import billSlice from "../slice/bill.slice";
import bookSlice from "../slice/bookSlice";
import borrowBookSlice from "../slice/borrowBook.slice";
import categorySlice from "../slice/category.slice";
import genreSlice from "../slice/genre.slice";
import librarySlice from "../slice/library.slice";
import wishListSlice from "../slice/wishList.slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    genre: genreSlice.reducer,
    category: categorySlice.reducer,
    book: bookSlice.reducer,
    borrowBook: borrowBookSlice.reducer,
    library: librarySlice.reducer,
    wishList: wishListSlice.reducer,
    bill: billSlice.reducer,
  },
  // devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
