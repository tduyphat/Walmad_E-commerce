import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CartItem from "../../interfaces/CartItem";
import Product from "../../interfaces/Product";

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const cartItem: CartItem = { ...product, quantity };
      const foundIndex = state.findIndex((item) => item.id === product.id);
      if (foundIndex !== -1) {
        state[foundIndex].quantity += quantity;
      } else {
        state.push(cartItem);
      }
    },
    addOneToCart: (state, action) => {
      const foundIndex = state.findIndex((item) => item.id === action.payload);
      if (foundIndex !== -1) {
        state[foundIndex].quantity ++;
      }
    },
    removeOneFromCart: (state, action) => {
      const foundIndex = state.findIndex((item) => item.id === action.payload);
      if (foundIndex !== -1) {
        if (state[foundIndex].quantity > 1) {
          state[foundIndex].quantity--;
        } else {
          state.splice(foundIndex, 1);
        }
      }
    },
  },
});

const cartReducer = cartSlice.reducer;
export const { addToCart, removeOneFromCart, addOneToCart } = cartSlice.actions;
export default cartReducer;
