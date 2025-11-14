import { ILibraryInitialState } from "@/interface/library.interface";
import { createSlice } from "@reduxjs/toolkit";
import {
  getLibraryBorrowstats,
  getLibraryStats,
  getSingleLibrary,
  updateLibrary,
} from "../thunk/library.thunk";

const initialState: ILibraryInitialState = {
  isLoading: false,
  isError: false,
  library: null,
  libraryStats: {
    totalBooks: 0,
    totalBorrowed: 0,
    totalPending: 0,
    totalActiveBorrow: 0,
    totalOverdue: 0,
  },
  libraryStatsLoading: false,

  libraryBorrowStats: [],
};
const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get single library
    builder.addCase(getSingleLibrary.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleLibrary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.library = action?.payload;
    });
    builder.addCase(getSingleLibrary.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // updatelibrary
    builder.addCase(updateLibrary.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateLibrary.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateLibrary.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // deletelibrary

    // libraryStats
    builder.addCase(getLibraryStats.pending, (state) => {
      state.libraryStatsLoading = true;
    });
    builder.addCase(getLibraryStats.fulfilled, (state, action) => {
      state.libraryStatsLoading = false;
      state.libraryStats = {
        totalBooks: action?.payload?.books,
        totalBorrowed: action?.payload?.borrowRequests,
        totalPending: action?.payload?.pendingBorrowRequests,
        totalActiveBorrow: action?.payload?.acceptedBorrowRequests,
        totalOverdue: action?.payload?.overdueBorrowRequests,
      };
    });
    builder.addCase(getLibraryStats.rejected, (state) => {
      state.libraryStatsLoading = false;
      state.isError = true;
    });

    // library borrowStats
    builder.addCase(getLibraryBorrowstats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLibraryBorrowstats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.libraryBorrowStats = action?.payload;
    });
    builder.addCase(getLibraryBorrowstats.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default librarySlice;
