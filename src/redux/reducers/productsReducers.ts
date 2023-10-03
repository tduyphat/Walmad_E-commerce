import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import Product from "../../interfaces/Product";
import PaginationQuery from "../../interfaces/PaginationQuery";
import CreateProductInput from "../../interfaces/CreateProductInput";
import UpdateProductInput from "../../interfaces/UpdateProductInput";

const initialState: {
  products: Product[];
  error?: string;
  loading: boolean;
} = {
  products: [],
  loading: false,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync",
  async ({ limit, offset }: PaginationQuery) => {
    try {
      const result = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      const data: Product[] = result.data;
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

export const createProductAsync = createAsyncThunk(
  "createProductAsync",
  async(newProduct: CreateProductInput, { rejectWithValue }) => {
    try {
      const result = await axios.post<Product>("https://api.escuelajs.co/api/v1/products/", newProduct)
      return result.data;
    }
    catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
)

export const updateProductAsync = createAsyncThunk(
  "updateProductAsync",
  async(updateProduct: UpdateProductInput, { rejectWithValue }) => {
    try {
      const result = await axios.post<Product>("https://api.escuelajs.co/api/v1/products/", updateProduct)
      return result.data;
    }
    catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
)

export const deleteProductAsync = createAsyncThunk(
  "deleteProductAsync",
  async (id: number) => {
    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
      return id;
    } catch (e) {
      const error = e as Error;
      return error;
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
      if (!(action.payload instanceof Error)) {
        state.products = action.payload;
        state.loading = false;
      }
    });
    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.loading = false;
        state.error = action.payload.message;
      }
    });
    //delete product
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: state.products.filter(
            (product) => product.id !== action.payload
          ),
          loading: false,
        };
      }
    });
    builder.addCase(deleteProductAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    //create product
    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      state.products.push(action.payload);
    })
    builder.addCase(createProductAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    })
    //update product
    // builder.addCase(createProductAsync.fulfilled, (state, action) => {
    //   const foundIndex = state.products.findIndex(product => product.id === action.payload.id)
    //   if (foundIndex >= 0) {
    //     state.products[foundIndex] = action.payload;
    //   }
    // })
  },
});

const productsReducer = productsSlice.reducer;
export const { sortByPrice, sortByTitle } = productsSlice.actions;

export default productsReducer;
