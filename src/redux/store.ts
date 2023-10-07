import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducers";
import cartReducer from "./reducers/cartReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import usersReducer from "./reducers/usersReducer";
import CartItem from "../interfaces/CartItem";

const preCartReducer: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

export const createStore = () => {
  return configureStore({
    reducer: {
      productsReducer,
      cartReducer,
      categoriesReducer,
      usersReducer,
    },
    preloadedState: {
      cartReducer: preCartReducer
    },
  });
};

const store = createStore();

const updateLocalStorage = () => {
  const cart = store.getState().cartReducer;
  localStorage.setItem("cart", JSON.stringify(cart));
};

store.subscribe(updateLocalStorage);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
