import { endPoints } from "@/data/env.data";
import { main_url } from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await main_url.get(endPoints?.getAllCategory);
      return resp.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getLibraryBookCategoryStats = createAsyncThunk(
  "category/getCategoryStats",
  async (_, {rejectWithValue}) => {
    try {
      const resp = await main_url.get(endPoints?.getLibraryBookCategoryStats);
      return resp.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
