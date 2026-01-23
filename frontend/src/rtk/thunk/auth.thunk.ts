import { auth, googleProvider } from "@/config/firebase.config";
import { endPoints } from "@/data/env.data";
import { LoginInterface, RegisterInterface } from "@/interface/auth.interface";
import { main_url } from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (paload: RegisterInterface, { rejectWithValue }) => {
    try {
      const resp = await main_url.post(endPoints?.register, paload);
      return resp.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginInterface, { rejectWithValue }) => {
    try {
      const resp = await main_url.post(endPoints?.login, payload);
      return resp.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const googleLoginThunk = createAsyncThunk(
  "auth/gooleLogin",
  async (__, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
      console.log("🚀 ~ idToken:", idToken)

<<<<<<< HEAD
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          credentials: "include",
        }
      );
=======
      const response = await main_url.post(endPoints?.googleLogin, { idToken }, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
>>>>>>> 0cec90a (making more secure for the otp validation while user signup and change the entity of the auth and created the more funtion to generate the signup otp and will make the input box or dialog to verify the otp)
      console.log("🚀 ~ google signin response :", response)

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const authorizeThunk = createAsyncThunk(
  "auth/authorize",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await main_url.get(endPoints?.authorize);
<<<<<<< HEAD
      console.log("🚀 ~ authorize thunk resp:", resp)
=======
      console.log("🚀 ~ resp:", resp)
>>>>>>> 0cec90a (making more secure for the otp validation while user signup and change the entity of the auth and created the more funtion to generate the signup otp and will make the input box or dialog to verify the otp)
      
      return resp.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const checkAuthThunk = createAsyncThunk(
  "auth/checkAuth",
  async (payload: LoginInterface, { rejectWithValue }) => {
    try {
      const resp = await main_url.post(endPoints?.me, payload);
      return resp.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const me = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await main_url.get(endPoints?.me);
      console.log("🚀 ~ me resp:", resp);
      return resp.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await main_url.post(endPoints?.logout);
      return resp;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(error);
    }
  }
);
