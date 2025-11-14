import { endPoints } from "@/data/env.data";
import { main_url } from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLatestBook = createAsyncThunk(
  "latest/book",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await main_url.get(endPoints?.getLatestBook);
      return resp?.data?.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(error);
    }
  }
);
//
export const getSingleBook = createAsyncThunk(
  "single/book",
  async (id: string, { rejectWithValue }) => {
    try {
      const resp = await main_url.get(endPoints?.getSingleBook(id));
      return resp?.data?.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(error);
    }
  }
);

// get book list
export const getBookList = createAsyncThunk(
  "book/list",
  async (
    payload: {
      search?: string;
      page?: number;
      genre?: string;
      category?: string;
      library?: string;
      limit?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.get(endPoints?.getBookList(payload));
      return resp?.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(error);
    }
  }
);

// get books by library
export const getBooksByLibrary = createAsyncThunk(
  "book/library",
  async (
    payload: {
      id: string;
      search?: string;
      page?: number;
      genre?: string;
      category?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.get(endPoints?.getBooksByLibrary(payload));
      console.log("🚀 ~ library books", resp);
      return resp?.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(error);
    }
  }
);
