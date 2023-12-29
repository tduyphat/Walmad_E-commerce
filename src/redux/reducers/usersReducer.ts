import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import User from "../../interfaces/User";
import UserCredentials from "../../interfaces/UserCredentials";
import UsersReducerState from "../../interfaces/UsersReducerState";
import UpdateUserInput from "../../interfaces/UpdateUserInput";

const initialState: UsersReducerState = {};

export const loginUserAsync = createAsyncThunk<
  User,
  UserCredentials,
  { rejectValue: string }
>("loginUserAsync", async (cred, { rejectWithValue, dispatch }) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}api/v1/auth/login`,
      cred
    );
    const access_token = result.data;
    localStorage.setItem("access_token", access_token);
    const authenticatedResult = await dispatch(
      authenticateUserAsync(access_token)
    );
    if (
      typeof authenticatedResult.payload === "string" ||
      !authenticatedResult.payload
    ) {
      throw Error(authenticatedResult.payload || "Cannot login");
    } else {
      return authenticatedResult.payload as User;
    }
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const authenticateUserAsync = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("authenticateUserAsync", async (token, { rejectWithValue }) => {
  try {
    const getprofile = await axios.get(
      `${process.env.REACT_APP_API_URL}api/v1/auth/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return getprofile.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const updateUserAsync = createAsyncThunk(
  "updateUserAsync",
  async ({ id, update }: UpdateUserInput, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await axios.patch<User>(
        `${process.env.REACT_APP_API_URL}api/v1/users/${id}`,
        update,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result.data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logOut: (state) => {
      state.currentUser = undefined;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      state.error = action.payload;
    });
    //authenticate user
    builder.addCase(authenticateUserAsync.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(authenticateUserAsync.rejected, (state, action) => {
      state.error = action.payload;
    });
    //update user
    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(updateUserAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});
const usersReducer = userSlice.reducer;
export const { logOut } = userSlice.actions;
export default usersReducer;
