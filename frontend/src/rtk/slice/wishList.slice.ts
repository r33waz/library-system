import { IInittialWishListState } from "@/interface/wishList.interface";
import { createSlice } from "@reduxjs/toolkit";
import { getWishListById, toggleWishList } from "../thunk/wishList.thunk";

const initialState: IInittialWishListState = {
  isLoading: false,
  isError: false,
  wishList: [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleWishList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(toggleWishList.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(toggleWishList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // single user wishlist
      .addCase(getWishListById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getWishListById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishList = action.payload
      })
      .addCase(getWishListById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

  },
});

export default wishListSlice;
