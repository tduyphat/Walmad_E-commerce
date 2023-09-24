import React from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <p>NavBar</p>
      <Outlet />
    </>
  );
};

export default Root;
