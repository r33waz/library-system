import { endPoints } from "@/data/env.data";
import { main_url } from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const borrowBook = createAsyncThunk(
  "borrowBook",
  async (
    {
      bookId,
      libraryId,
      startDate,
      endDate,
    }: {
      bookId: string;
      libraryId: string;
      startDate: string;
      endDate: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.post(endPoints?.borrowRequest, {
        bookId,
        libraryId,
        startDate,
        endDate,
      });
      return resp.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const getuserBorrow = createAsyncThunk(
  "userBorrowHistory",
  async (
    payload: {
      search?: string;
      page?: number;
      startDate?: string;
      endDate?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.get(endPoints?.getAllBorrowRequest(payload));
      return resp?.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
