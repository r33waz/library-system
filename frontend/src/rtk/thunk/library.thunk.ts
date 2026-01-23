import { endPoints } from "@/data/env.data";
import { ILibraryInterface } from "@/interface/library.interface";
import { main_url } from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSingleLibrary = createAsyncThunk(
  "single/library",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const resp = await main_url.get(endPoints?.getSingleLibrary(id));
      return resp?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateLibrary = createAsyncThunk(
  "update/library",
  async (
    { id, data }: { id: string; data: Partial<ILibraryInterface> },
    { rejectWithValue }
  ) => {
    console.log("🚀 ~ data:", data)
    try {
      const resp = await main_url.patch(endPoints.updateLibrary(id), data);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getLibraryStats = createAsyncThunk(
  "library/stats",
  async (
    payload: {
      startDate?: string;
      endDate?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.get(endPoints?.getLibraryStats(payload));
      console.log("🚀 ~ librarystats:", resp);
      return resp?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getLibraryBorrowstats = createAsyncThunk(
  "library/borrowstats",
  async () => {
    try {
      const res = await main_url.get(endPoints?.getLibraryBorrowStats);
      return res?.data?.data;
    } catch (error) {
      return error;
    }
  }
);
