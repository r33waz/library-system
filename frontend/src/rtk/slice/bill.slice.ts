import { InititalBillState } from "@/interface/bill.interface";
import { createSlice } from "@reduxjs/toolkit";
import { getSingleBill } from "../thunk/bill.thunks";

const initialState: InititalBillState = {
  isloading: false,
  error: false,
  bills: [],
  singleBill: null,
};

export const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleBill.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getSingleBill.fulfilled, (state, action) => {
      state.isloading = false;
      state.singleBill = action?.payload;
    });
    builder.addCase(getSingleBill.rejected, (state) => {
      state.isloading = false;
      state.error = true;
    });
  },
});

export default billSlice
