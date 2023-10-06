import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../../redux/reducers/productsReducers";
import cartReducer from "../../redux/reducers/cartReducer";
import categoriesReducer from "../../redux/reducers/categoriesReducer";
import userReducer from "../../redux/reducers/userReducer";
import { productsData } from "../data/productsData";

const fakeStore = configureStore({
  reducer: {
    productsReducer,
    cartReducer,
    categoriesReducer,
    userReducer,
  },
  preloadedState: {
    productsReducer: {
      loading: false,
      products: productsData,
    },
  },
});

export default fakeStore;
