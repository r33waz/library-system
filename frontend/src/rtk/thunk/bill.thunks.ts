import { endPoints } from "@/data/env.data";
import { main_url } from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllBill = createAsyncThunk("all/bill", async () => {});

export const getSingleBill = createAsyncThunk(
  "single/bill",
  async (id: string) => {
    const resp = await main_url.get(endPoints?.getSingleBill(id));
    console.log("🚀 ~ Bill resp:", resp);
    return resp?.data?.data;
  }
);
