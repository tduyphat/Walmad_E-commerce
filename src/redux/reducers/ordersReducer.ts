import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import Order from "../../interfaces/Order";
import PaginationQuery from "../../interfaces/PaginationQuery";
import OrderInput from "../../interfaces/OrderInput";
import UpdateOrderInput from "../../interfaces/UpdateOrderInput";

export const initialState: {
  orders: Order[];
  error?: string;
  loading: boolean;
} = {
  orders: [],
  loading: false,
};

export const fetchAllOrdersAsync = createAsyncThunk(
  "fetchAllOrdersAsync",
  async ({ limit, offset }: PaginationQuery, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}api/v1/orders?offset=${offset}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: Order[] = result.data;
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const createOrderAsync = createAsyncThunk(
  "createOrderAsync",
  async (newOrder: OrderInput, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await axios.post<Order>(
        `${process.env.REACT_APP_API_URL}api/v1/orders/`,
        newOrder,
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

export const updateOrderAsync = createAsyncThunk(
  "updateOrderAsync",
  async ({ id, update }: UpdateOrderInput, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await axios.patch<Order>(
        `${process.env.REACT_APP_API_URL}api/v1/orders/${id}`,
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

export const deleteOrderAsync = createAsyncThunk(
  "deleteOrderAsync",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await axios.delete<boolean>(
        `${process.env.REACT_APP_API_URL}api/v1/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!result.data) {
        throw new Error("The order does not exist!");
      } else {
        return id;
      }
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch all orders
    builder.addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllOrdersAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllOrdersAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //delete order
    builder.addCase(deleteOrderAsync.fulfilled, (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    });
    builder.addCase(deleteOrderAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    //create order
    builder.addCase(createOrderAsync.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    });
    builder.addCase(createOrderAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    //update order
    builder.addCase(updateOrderAsync.fulfilled, (state, action) => {
      const foundIndex = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (foundIndex >= 0) {
        state.orders[foundIndex] = action.payload;
      }
    });
    builder.addCase(updateOrderAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

const ordersReducer = ordersSlice.reducer;
export default ordersReducer;
