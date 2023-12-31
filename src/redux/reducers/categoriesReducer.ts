import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Category from "../../interfaces/Category";
import axios from "axios";

const initialState: {
  categories: Category[];
  error?: string;
  loading: boolean;
} = {
  categories: [],
  loading: false,
};

export const fetchAllCategoriesAsync = createAsyncThunk(
  "fetchAllCategoriesAsync",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}api/v1/categorys/`
      );
      const data: Category[] = result.data;
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
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
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllCategoriesAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;
