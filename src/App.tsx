import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import ProductsByCategory from "./pages/ProductsByCategory";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Root from "./pages/Root";
import Products from "./pages/Products";
import useAppDispatch from "./hooks/useAppDispatch";
import { fetchAllCategoriesAsync } from "./redux/reducers/categoriesReducer";
import { fetchAllProductsAsync } from "./redux/reducers/productsReducers";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, []);

  useEffect(() => {
    dispatch(fetchAllProductsAsync({ offset: 0, limit: 0 }));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/categories/:id/products",
          element: <ProductsByCategory />,
        },
        {
          path: "/products/:id",
          element: <ProductDetails />,
        },
        {
          path: "/admin",
          element: <AdminDashboard />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
