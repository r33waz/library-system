import { IBookIntitialState } from "@/interface/book.interface";
import { createSlice } from "@reduxjs/toolkit";
import {
  getBookList,
  getBooksByLibrary,
  getLatestBook,
  getSingleBook,
} from "../thunk/book.thunk";

const initialState: IBookIntitialState = {
  isLoading: false,
  isError: false,
  isLatestBookLoading: false,
  latestBookError: false,
  latestBook: [],

  // single book
  singleBook: null,
  isSingleBookLoading: false,
  singleBookError: false,

  // books List
  books: [],
  isBooksLoading: false,
  booksError: false,
  totalPages: 0,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLatestBook.pending, (state) => {
        state.isLatestBookLoading = true;
        state.latestBookError = false;
      })
      .addCase(getLatestBook.fulfilled, (state, action) => {
        state.isLatestBookLoading = false;
        state.latestBook = action.payload;
      })
      .addCase(getLatestBook.rejected, (state) => {
        state.isLatestBookLoading = false;
        state.latestBookError = true;
      })

      // single book
      .addCase(getSingleBook.pending, (state) => {
        state.isSingleBookLoading = true;
        state.singleBookError = false;
      })
      .addCase(getSingleBook.fulfilled, (state, action) => {
        state.isSingleBookLoading = false;
        state.singleBook = action.payload;
      })
      .addCase(getSingleBook.rejected, (state) => {
        state.isSingleBookLoading = false;
        state.singleBookError = true;
      })

      // all book list
      .addCase(getBookList.pending, (state) => {
        state.isBooksLoading = true;
        state.booksError = false;
      })
      .addCase(getBookList.fulfilled, (state, action) => {
        state.isBooksLoading = false;
        state.books = action.payload.data;
        state.totalPages = action.payload.pagination.totalPages;
      })
      .addCase(getBookList.rejected, (state) => {
        state.isBooksLoading = false;
        state.booksError = true;
      })

      // all library books
      .addCase(getBooksByLibrary.pending, (state) => {
        state.isBooksLoading = true;
        state.booksError = false;
      })
      .addCase(getBooksByLibrary.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action)
        state.isBooksLoading = false;
        state.books = action.payload.data;
        state.totalPages = action.payload.pagination.totalPages;
      })
      .addCase(getBooksByLibrary.rejected, (state) => {
        state.isBooksLoading = false;
        state.booksError = true;
      });
  },
});

export default bookSlice;
