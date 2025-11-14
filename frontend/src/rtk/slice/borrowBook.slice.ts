import { IBorrowBookState } from "@/interface/borrow.interface";
import { createSlice } from "@reduxjs/toolkit";
import { borrowBook, getuserBorrow } from "../thunk/borrow.thunk";

const initialState: IBorrowBookState = {
  isLoading: false,
  isError: false,
  borrowBook: [],
  totalPages: 0,
};

const borrowBookSlice = createSlice({
  name: "borrowBook",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(borrowBook.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(borrowBook.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(borrowBook.rejected, (state) => {
      state.isLoading = false;
    });

    // user borrow book
    builder.addCase(getuserBorrow.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getuserBorrow.fulfilled, (state, action) => {
      state.isLoading = false;
      state.borrowBook = action?.payload?.data;
      state.totalPages = action.payload.pagination.totalPages;
    });
    builder.addCase(getuserBorrow.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default borrowBookSlice;
