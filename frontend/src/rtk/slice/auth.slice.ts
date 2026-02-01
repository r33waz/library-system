import { IAuthInitialState } from "@/interface/auth.interface";
import { createSlice } from "@reduxjs/toolkit";
import {
  authorizeThunk,
  googleLoginThunk,
  loginThunk,
  logout,
  me,
  registerThunk,
} from "../thunk/auth.thunk";

// Initial state
const initialState: IAuthInitialState = {
  isLoading: false,
  error: false,
  isAuthenticated: false,
  isAuthChecked: false,
  user: {
    role: "",
  },
  initialized: false,
  isUserLoading: false,
  isUserError: false,
  userDeatails: null,

  // google login related fields
  googleLoading: false,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {},
  extraReducers: (builder) => {
    // Handle register
    builder.addCase(registerThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    // Handle login
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
      state.isAuthenticated = false; // Auth is false until login is successful
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user.role = action?.payload?.data ? action?.payload?.data : null;
      state.isAuthenticated = true;
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
      state.isAuthenticated = false; // On failure, reset auth to false
    });

    // google signin
    builder.addCase(googleLoginThunk.pending, (state) => {
      state.googleLoading = true;
    });

    builder.addCase(googleLoginThunk.fulfilled, (state, action) => {
      state.googleLoading = false;
      state.user.role = action?.payload?.data ? action?.payload?.data : null;
      state.isAuthenticated = true;
    });

    builder.addCase(googleLoginThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
      state.isAuthenticated = false;
    });

    // Handle authorization (getting user info)
    builder.addCase(authorizeThunk.pending, (state) => {
      state.isLoading = true;
      state.isAuthChecked = false; // Set to false when starting the check
    });

    builder.addCase(authorizeThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = action?.payload?.status;
      state.user.role = action?.payload?.data ? action?.payload?.data : null;
      state.isAuthChecked = true; // <--- ADD THIS LINE
    });

    builder.addCase(authorizeThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
      state.isAuthenticated = false;
      state.isAuthChecked = true; // <--- ADD THIS LINE (Even if rejected, the check is complete)
    });
    // user details
    builder.addCase(me.pending, (state) => {
      state.isUserLoading = true;
      state.isAuthChecked = false;
    });
    builder.addCase(me.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.userDeatails = action?.payload?.data;
      state.isAuthenticated = true;
      state.isAuthChecked = true;
    });
    builder.addCase(me.rejected, (state) => {
      state.isUserLoading = false;
      state.isUserError = true;
      state.isAuthenticated = false;
      state.isAuthChecked = true;
    });

    // use logout
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user.role = null;
    });

    builder.addCase(logout.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default authSlice;
