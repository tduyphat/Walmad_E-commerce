import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useDispatch } from "react-redux";
import { addOneToCart, removeOneFromCart } from "../redux/reducers/cartReducer";
import CartItem from "../interfaces/CartItem";

const ItemInCart = (item: CartItem) => {
  const dispatch = useDispatch();

  return (
    <Paper
      sx={{backgroundColor: "inherit"}}
      elevation={0}
      style={{ paddingBottom: 20 }}
    >
      <Grid container justifyContent="space-between">
        <Grid item xs={12} md={6}>
          <Typography variant="h5">{item.title}</Typography>
          <Grid container justifyContent="space-between">
            <Typography>Price: € {item.price}</Typography>
            <Typography>Total: € {item.quantity * item.price}</Typography>
          </Grid>
          <Grid container alignItems="center">
            <Typography>Quantity: </Typography>
            <IconButton
              size="small"
              color="primary"
              onClick={() => dispatch(removeOneFromCart(item.id))}
            >
              <ChevronLeftIcon />
            </IconButton>
            <Typography>{item.quantity}</Typography>
            <IconButton
              size="small"
              color="primary"
              onClick={() => dispatch(addOneToCart(item.id))}
            >
              <ChevronRightIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src={item.images[0]}
            alt={item.title}
            style={{ maxWidth: 180, objectFit: "cover", marginLeft: 40 }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemInCart;
