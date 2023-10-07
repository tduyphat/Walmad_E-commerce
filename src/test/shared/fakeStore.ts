import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../../redux/reducers/productsReducers";
import cartReducer from "../../redux/reducers/cartReducer";
import categoriesReducer from "../../redux/reducers/categoriesReducer";
import usersReducer from "../../redux/reducers/usersReducer";
import { productsData } from "../data/productsData";

const fakeStore = configureStore({
  reducer: {
    productsReducer,
    cartReducer,
    categoriesReducer,
    usersReducer,
  },
  preloadedState: {
    productsReducer: {
      loading: false,
      products: productsData,
    },
  },
});

export default fakeStore;
