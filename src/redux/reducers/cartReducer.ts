import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CartItem from "../../interfaces/CartItem";
import Product from "../../interfaces/Product";

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const cartItem: CartItem = { ...action.payload, quantity: 1 };
      const foundIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (foundIndex !== -1) {
        state[foundIndex].quantity++;
      } else {
        state.push(cartItem);
      }
    },
  },
});

const cartReducer = cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
export default cartReducer;
