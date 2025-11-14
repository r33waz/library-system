import { ICategoryIntitialState } from "@/interface/category.interface";
import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCategories,
  getLibraryBookCategoryStats,
} from "../thunk/category.thunk";

const initistate: ICategoryIntitialState = {
  categories: [],
  isLoading: false,
  isError: false,
  libraryBookCategoryStats: [],
  libraryBookCategoryStatsLoading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initistate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action?.payload?.data;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // library book with the category stats
    builder.addCase(getLibraryBookCategoryStats.pending, (state) => {
      state.libraryBookCategoryStatsLoading = true;
    });
    builder.addCase(getLibraryBookCategoryStats.fulfilled, (state, action) => {
      state.libraryBookCategoryStatsLoading = false;
      state.libraryBookCategoryStats = action?.payload?.data;
    });
    builder.addCase(getLibraryBookCategoryStats.rejected, (state) => {
      state.libraryBookCategoryStatsLoading = false;
    });
  },
});

export default categorySlice;
