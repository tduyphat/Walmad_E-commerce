import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducers";
import cartReducer from "./reducers/cartReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import userReducer from "./reducers/userReducer";
import CartItem from "../interfaces/CartItem";

const preCartReducer: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

const preUserReducer = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const store = configureStore({
  reducer: {
    productsReducer,
    cartReducer,
    categoriesReducer,
    userReducer
  },
  preloadedState: {
    cartReducer: preCartReducer,
    userReducer: preUserReducer,
  },
});

const updateLocalStorage = () => {
  const cart = store.getState().cartReducer;
  const user = store.getState().userReducer;
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("user", JSON.stringify(user));
};

store.subscribe(updateLocalStorage);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
