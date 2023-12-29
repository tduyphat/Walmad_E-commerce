import React from "react";
import useAppSelector from "../hooks/useAppSelector";
import { Navigate } from "react-router-dom";

const CheckAdmin = (props: any) => {
  const { children } = props;
  const { currentUser } = useAppSelector((state) => state.usersReducer);
  return currentUser?.role === "Admin" ? children : <Navigate to="/" replace={true} />;
};

export default CheckAdmin;