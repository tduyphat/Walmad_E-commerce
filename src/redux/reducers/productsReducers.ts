import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import Product from "../../interfaces/Product";
import PaginationQuery from "../../interfaces/PaginationQuery";

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

export const deleteProductAsync = createAsyncThunk(
  "deleteProductAsync",
  async (id: number) => {
    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
      return true;
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
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      const foundIndex = state.products.findIndex(
        (product) => product.id === action.payload
      );
      state.products.splice(foundIndex, 1);
    },
    sortByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products.sort((a, b) => b.price - a.price);
      }
    },
  },
  extraReducers: (builder) => {
    //fetch all products
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      }
    });
    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    //delete product
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
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
  },
});

const productsReducer = productsSlice.reducer;
export const { addProduct, removeProduct, sortByPrice } = productsSlice.actions;

export default productsReducer;
