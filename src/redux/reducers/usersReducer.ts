import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import User from "../../interfaces/User";
import UserCredentials from "../../interfaces/UserCredentials";
import UsersReducerState from "../../interfaces/UsersReducerState";
import UpdateUserInput from "../../interfaces/UpdateUserInput";
import UpdateUserRoleInput from "../../interfaces/UpdateUserRoleInput";

const initialState: UsersReducerState = { users: [], loading: false };

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

export const updateCurrentUserAsync = createAsyncThunk(
  "updateCurrentUserAsync",
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

export const fetchAllUsersAsync = createAsyncThunk(
  "fetchAllUsersAsync",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}api/v1/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: User[] = result.data;
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "deleteUserAsync",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await axios.delete<boolean>(
        `${process.env.REACT_APP_API_URL}api/v1/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!result.data) {
        throw new Error("The user does not exist!");
      } else {
        return id;
      }
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

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

export const updateUserRoleAsync = createAsyncThunk(
  "updateUserRoleAsync",
  async ({ id, update }: UpdateUserRoleInput, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await axios.patch<User>(
        `${process.env.REACT_APP_API_URL}api/v1/users/update-role/${id}`,
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
    //update current user
    builder.addCase(updateCurrentUserAsync.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(updateCurrentUserAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    //fetch all users
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllUsersAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUsersAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //delete user
    builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    });
    builder.addCase(deleteUserAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    //update user
    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      const foundIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (foundIndex >= 0) {
        state.users[foundIndex] = action.payload;
      }
    });
    builder.addCase(updateUserAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    //update user role
    builder.addCase(updateUserRoleAsync.fulfilled, (state, action) => {
      const foundIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (foundIndex >= 0) {
        state.users[foundIndex] = action.payload;
      }
    });
    builder.addCase(updateUserRoleAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});
const usersReducer = userSlice.reducer;
export const { logOut } = userSlice.actions;
export default usersReducer;
