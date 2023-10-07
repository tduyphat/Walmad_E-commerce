import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import NavBar from "../components/NavBar";
import Cart from "../components/Cart";

const Root = () => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
      <ToastContainer />
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart />
      </Drawer>
      <NavBar setCartOpen={setCartOpen} />
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
