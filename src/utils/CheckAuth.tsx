import React from "react";
import useAppSelector from "../hooks/useAppSelector";
import { Navigate } from "react-router-dom";

const CheckAuth = (props: any) => {
  const { children } = props;
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);
  return isLoggedIn ? children : <Navigate to="/login" replace={true} />;
};

export default CheckAuth;