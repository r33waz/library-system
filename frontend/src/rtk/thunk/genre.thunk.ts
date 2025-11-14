import { endPoints } from "@/data/env.data";
import { main_url } from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetAllGenre = createAsyncThunk(
  "genre/getAllGenre",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await main_url.get(endPoints?.getAllGenre);
      return resp.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(error);
    }
  }
);

export const getLibraryBookGenreStats = createAsyncThunk(
  "category/getGenreStats",
  async (_, {rejectWithValue}) => {
    try {
      const resp = await main_url.get(endPoints?.getLibraryBookGenreStats);
      return resp.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
