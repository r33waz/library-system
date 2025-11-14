import { IGenreIntitialState } from "@/interface/genre.interface";
import { createSlice } from "@reduxjs/toolkit";
import { GetAllGenre, getLibraryBookGenreStats } from "../thunk/genre.thunk";

const initialState: IGenreIntitialState = {
  isLoading: false,
  error: false,
  genre: [],
  libraryBookGenreStats: [],
  libraryBookStatsLoading: false,
};

const genreSlice = createSlice({
  initialState,
  name: "genre",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetAllGenre.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetAllGenre.fulfilled, (state, action) => {
      state.isLoading = false;
      state.genre = action?.payload?.data;
    });
    builder.addCase(GetAllGenre.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    // libraryBookGenreStats
    builder.addCase(getLibraryBookGenreStats.pending, (state) => {
      state.libraryBookStatsLoading = true;
    });
    builder.addCase(getLibraryBookGenreStats.fulfilled, (state, action) => {
      state.libraryBookStatsLoading = false;
      state.libraryBookGenreStats = action?.payload?.data;
    });
    builder.addCase(getLibraryBookGenreStats.rejected, (state) => {
      state.libraryBookStatsLoading = false;
      state.error = true;
    });
  },
});

export default genreSlice;
