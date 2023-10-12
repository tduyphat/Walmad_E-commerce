import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";

import NavBar from "../components/NavBar";
import Cart from "../components/Cart";
import { useTheme } from "../ThemeProvider";
import StickyFooter from "../components/Footer";

const Root = () => {
  const { themeMode } = useTheme();
  const customBackgroundColor = themeMode === "light" ? "#f5f5f5" : "#333";
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div style={{ backgroundColor: customBackgroundColor, minHeight: "100vh" }}>
      <ConfirmProvider>
        <ToastContainer />
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart setCartOpen={setCartOpen}/>
        </Drawer>
        <NavBar setCartOpen={setCartOpen} />
        <Container
          sx={{
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <Outlet />
        </Container>
        <StickyFooter />
      </ConfirmProvider>
    </div>
  );
};

export default Root;
