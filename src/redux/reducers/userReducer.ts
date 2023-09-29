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
        },
        {
          headers: {
            "Content-Type": "application/json",
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
      localStorage.removeItem("user");  
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      if (action.payload.hasOwnProperty("access_token")) {
        return {
          ...state,
          accessToken: action.payload.access_token,
          isLoggedIn: true,
        };
      }
      return {
        ...state,
        error: action.payload.message,
      };
    });
    builder.addCase(getUserWithSessionAsync.fulfilled, (state, action) => {
      if (action.payload.statusCode === 401) {
        return {
          ...state,
          error: action.payload.message,
        };
      }
      return {
        ...state,
        user: action.payload,
      };
    });
    builder.addCase(getUserWithSessionAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getUserWithSessionAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
  },
});

const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;

export default userReducer;
