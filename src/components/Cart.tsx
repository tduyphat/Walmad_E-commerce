import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ItemInCart from "./ItemInCart";
import useAppSelector from "../hooks/useAppSelector";

const Cart = ({
  setCartOpen,
}: {
  setCartOpen: (cartOpen: boolean) => void;
}) => {
  const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
  const cart = useAppSelector((state) => state.cartReducer);
  const navigate = useNavigate();

  return (
    <Box style={{ width: 500, padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1">No items in cart.</Typography>
      ) : null}
      {cart.map((item) => (
        <ItemInCart {...item} key={item.id} />
      ))}
      <Typography variant="h4">
        Total: €{" "}
        {cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
      </Typography>
      {cart.length > 0 && (
        <Button
          sx={{ marginTop: 5 }}
          size="large"
          fullWidth
          variant="contained"
          onClick={() => {
            navigate(currentUser?.role === "Customer" ? "/checkout" : "/login");
            setCartOpen(false);
          }}
        >
          Check Out
        </Button>
      )}
    </Box>
  );
};

export default Cart;
