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
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const foundIndex = state.findIndex((item) => item.id === action.payload);
      if (foundIndex !== -1) {
        state[foundIndex].quantity++;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const foundIndex = state.findIndex((item) => item.id === action.payload);
      if (foundIndex !== -1) {
        if (state[foundIndex].quantity > 1) {
          state[foundIndex].quantity--;
        } else {
          state.splice(foundIndex, 1);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const foundIndex = state.findIndex((item) => item.id === action.payload);
      if (foundIndex > -1) {
        state.splice(foundIndex, 1);
      }
    },
    emptyCart: (state) => {
      state = [];
    },
  },
});

const cartReducer = cartSlice.reducer;
export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, emptyCart } =
  cartSlice.actions;
export default cartReducer;
