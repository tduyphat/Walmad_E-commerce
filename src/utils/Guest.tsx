import React from "react";
import useAppSelector from "../hooks/useAppSelector";
import { Navigate } from "react-router-dom";

const Guest = (props: any) => {
  const { children } = props;
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);
  return !isLoggedIn ? children : <Navigate to="/" replace={true} />;
};

export default Guest;
