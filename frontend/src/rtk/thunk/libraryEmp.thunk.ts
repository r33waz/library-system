import { endPoints } from "@/data/env.data";
import { main_url } from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSingleLibraryEmp = createAsyncThunk(
  "single/libraryEmp",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const resp = await main_url.get(endPoints?.getSingleLibraryEmp(id));
      return resp?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
