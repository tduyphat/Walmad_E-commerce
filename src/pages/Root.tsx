import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

import NavBar from "../components/NavBar";

const Root = () => {
  return (
    <>
      <NavBar />
      <Container
        sx={{
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Outlet />
      </Container>
    </>
  );
};

export default Root;
