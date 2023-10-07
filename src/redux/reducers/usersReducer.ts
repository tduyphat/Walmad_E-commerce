import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import User from "../../interfaces/User";
import UserCredentials from "../../interfaces/UserCredentials";
import UsersReducerState from "../../interfaces/UsersReducerState";

const initialState: UsersReducerState = {
  users: [],
};

export const fetchUsersAsync = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("fetchUsersAsync", async (_, { rejectWithValue }) => {
  try {
    const result = await axios.get("https://api.escuelajs.co/api/v1/users");
    return result.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});
export const loginUserAsync = createAsyncThunk<
  User,
  UserCredentials,
  { rejectValue: string }
>("loginUserAsync", async (cred, { rejectWithValue, dispatch }) => {
  try {
    const result = await axios.post(
      "https://api.escuelajs.co/api/v1/auth/login",
      cred
    );
    const { access_token } = result.data;
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
>("authenticateUserAsync", async (access_token, { rejectWithValue }) => {
  try {
    const getprofile = await axios.get(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return getprofile.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logOut: (state) => {
      state.users = [];
      state.currentUser = undefined;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    //fetch all users
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(fetchUsersAsync.rejected, (state, action) => {
      state.error = action.payload;
    });
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
  },
});
const usersReducer = userSlice.reducer;
export const { logOut } = userSlice.actions;
export default usersReducer;
