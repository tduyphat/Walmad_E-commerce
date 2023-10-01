import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Category from "../../interfaces/Category";
import axios from "axios";

const initialState: {
  categories: Category[];
  error?: string;
  loading: boolean;
} = {
  categories: [],
  error: "",
  loading: false,
};

export const fetchAllCategoriesAsync = createAsyncThunk(
  "fetchAllCategoriesAsync",
  async () => {
    try {
      const result = await axios.get(
        `https://api.escuelajs.co/api/v1/categories/`
      );
      const data: Category[] = result.data;
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch all categories
    builder.addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        state.categories = action.payload;
        state.loading = false;
      }
    });
    builder.addCase(fetchAllCategoriesAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.loading = false;
        state.error = action.payload.message;
      }
    });
  },
});

const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;
