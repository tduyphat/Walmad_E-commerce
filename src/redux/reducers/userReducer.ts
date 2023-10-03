import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import User from "../../interfaces/User";
import LoginCredentials from "../../interfaces/LoginCredentials";

const initialState: {
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  error: string | null;
  loading: boolean;
} = {
  user: null,
  isLoggedIn: false,
  accessToken: null,
  error: null,
  loading: false,
};

export const loginAsync = createAsyncThunk(
  "loginAsync",
  async ({ email, password }: LoginCredentials) => {
    try {
      const result = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          email: email,
          password: password,
        }
      );
      return result.data;
    } catch (e) {
      const error = e as Error;
      return error.message;
    }
  }
);

export const getUserWithSessionAsync = createAsyncThunk(
  "getUserWithSessionAsync",
  async (token: string) => {
    try {
      const result = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result.data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      if (action.payload.hasOwnProperty("access_token")) {
        state.accessToken = action.payload.access_token;
        state.isLoggedIn = true;
        state.error = null;
      } else {
        state.error = "Wrong email or password!";
      }
    });
    //getUser
    builder.addCase(getUserWithSessionAsync.fulfilled, (state, action) => {
      if (action.payload.statusCode === 401) {
        state.error = action.payload.message;
      } else {
        state.user = action.payload;
        state.loading = false;
      }
    });
    builder.addCase(getUserWithSessionAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserWithSessionAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.loading = false;
        state.error = action.payload.message;
      }
    });
  },
});

const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;

export default userReducer;
