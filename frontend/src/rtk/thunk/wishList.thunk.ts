import { endPoints } from "@/data/env.data";
import { main_url } from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const toggleWishList = createAsyncThunk(
  "wishList/toggleWishList",
  async (
    { userId, bookId }: { userId: string; bookId: string },
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.post(endPoints?.toggleWishList, {
        userId,
        bookId,
      });
      return resp.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(error);
    }
  }
);

export const getWishListById = createAsyncThunk(
  "wishList/getWishList",
  async ({id}: {id:string}, { rejectWithValue }) => {
    try {
      const resp = await main_url.get(endPoints?.getWishListById(id));
      console.log("🚀 ~ resp:", resp)
      return resp?.data?.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(error);
    }
  }
);
