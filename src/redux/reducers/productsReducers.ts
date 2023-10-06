import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import Product from "../../interfaces/Product";
import PaginationQuery from "../../interfaces/PaginationQuery";
import CreateProductInput from "../../interfaces/CreateProductInput";
import UpdateProductInput from "../../interfaces/UpdateProductInput";

export const initialState: {
  products: Product[];
  error?: string;
  loading: boolean;
} = {
  products: [],
  loading: false,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync",
  async ({ limit, offset }: PaginationQuery, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      const data: Product[] = result.data;
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const createProductAsync = createAsyncThunk(
  "createProductAsync",
  async (newProduct: CreateProductInput, { rejectWithValue }) => {
    try {
      const result = await axios.post<Product>(
        "https://api.escuelajs.co/api/v1/products/",
        newProduct
      );
      return result.data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  "updateProductAsync",
  async ({id, update}: UpdateProductInput, { rejectWithValue }) => {
    try {
      const result = await axios.put<Product>(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        update
      );
      return result.data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "deleteProductAsync",
  async (id: number, { rejectWithValue }) => {
    try {
      const result = await axios.delete<boolean>(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      if (!result.data) {
        throw new Error("The product does not exist!");
      } else {
        return id;
      }
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    sortByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products.sort((a, b) => b.price - a.price);
      }
    },
    sortByTitle: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.products.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        state.products.sort((a, b) => b.title.localeCompare(a.title));
      }
    },
  },
  extraReducers: (builder) => {
    //fetch all products
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //delete product
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    });
    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    //create product
    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    builder.addCase(createProductAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    //update product
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      const foundIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (foundIndex >= 0) {
        state.products[foundIndex] = action.payload;
      }
    });
    builder.addCase(updateProductAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

const productsReducer = productsSlice.reducer;
export const { sortByPrice, sortByTitle } = productsSlice.actions;

export default productsReducer;
