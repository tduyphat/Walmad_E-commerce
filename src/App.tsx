import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import ProductsByCategory from "./pages/ProductsByCategory";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Root from "./pages/Root";
import Products from "./pages/Products";
import CheckAdmin from "./utils/CheckAdmin";
import CheckAuth from "./utils/CheckAuth";
import useAppDispatch from "./hooks/useAppDispatch";
import { fetchAllCategoriesAsync } from "./redux/reducers/categoriesReducer";
import { fetchAllProductsAsync } from "./redux/reducers/productsReducers";
import { authenticateUserAsync } from "./redux/reducers/usersReducer";
import { ThemeProvider } from "./ThemeProvider";
import CheckOut from "./pages/CheckOut";
import ProductDashboard from "./pages/ProductDashboard";
import UserDashboard from "./pages/UserDashboard";
import OrderDashboard from "./pages/OrderDashboard";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      dispatch(authenticateUserAsync(access_token));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAllProductsAsync({
        offset: 0,
        limit: 500,
        sortType: "byTitle",
        sortOrder: "asc",
      })
    );
  }, [dispatch]);

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
          path: "/product-dashboard",
          element: (
            <CheckAdmin>
              <ProductDashboard />
            </CheckAdmin>
          ),
        },
        {
          path: "/user-dashboard",
          element: (
            <CheckAdmin>
              <UserDashboard />
            </CheckAdmin>
          ),
        },
        {
          path: "/order-dashboard",
          element: (
            <CheckAdmin>
              <OrderDashboard />
            </CheckAdmin>
          ),
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
          element: (
            <CheckAuth>
              <Profile />
            </CheckAuth>
          ),
        },
        {
          path: "/checkout",
          element: <CheckOut />,
        },
      ],
    },
  ]);
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
