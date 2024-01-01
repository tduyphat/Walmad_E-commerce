import React, { useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useConfirm } from "material-ui-confirm";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  deleteOrderAsync,
  fetchAllOrdersAsync,
  updateOrderAsync,
} from "../redux/reducers/ordersReducer";

const formatDateTime = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}`;
};

const OrderDashboard = () => {
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((state) => state.ordersReducer);

  useEffect(() => {
    dispatch(fetchAllOrdersAsync());
  }, [dispatch]);

  const handleOrderStatusChange =
    (id: string) => (event: SelectChangeEvent<string>) => {
      const newOrderStatus = event.target.value as string;
      dispatch(
        updateOrderAsync({ id, update: { orderStatus: newOrderStatus } })
      );
    };

  const handleDeleteOrder = (id: string) => () => {
    confirm({
      description: "Order will be deleted.",
    })
      .then(() => {
        dispatch(deleteOrderAsync(id));
      })
      .catch(() => {
        return;
      });
  };

  return (
    <>
      {!orders && loading && <Typography>Loading...</Typography>}
      {!loading && orders.length > 0 ? (
        orders.map((order) => {
          return (
            <Accordion key={order.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  Order Date:{" "}
                  {formatDateTime(new Date(order.createdAt.toString()))}{" "}
                  <span style={{ fontWeight: 600 }}>{order.orderStatus}</span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List disablePadding>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="User ID" />
                    <Typography variant="subtitle1">{order.user.id}</Typography>
                  </ListItem>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Name" />
                    <Typography variant="subtitle1">
                      {order.user.name}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Email" />
                    <Typography variant="subtitle1">
                      {order.user.email}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Address" />
                    <Typography variant="subtitle1">
                      {order.user.addressLine1} {order.user.addressLine2 || ""}{" "}
                      {order.user.postCode} {order.user.city}{" "}
                      {order.user.country}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Order ID" />
                    <Typography variant="subtitle1">{order.id}</Typography>
                  </ListItem>
                  {order.orderProducts.map((orderProduct) => (
                    <ListItem
                      key={orderProduct.product.id}
                      sx={{ py: 1, px: 0 }}
                    >
                      <ListItemText
                        primary={orderProduct.product.title}
                        secondary={`Quantity: ${orderProduct.quantity}`}
                      />
                      <Typography variant="body2">
                        €{orderProduct.product.price * orderProduct.quantity}
                      </Typography>
                    </ListItem>
                  ))}
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      €
                      {order.orderProducts.reduce(
                        (acc, curr) => acc + curr.product.price * curr.quantity,
                        0
                      )}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Order Status" />
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700 }}
                      color={
                        order.orderStatus === "Cancelled" ? "error" : "primary"
                      }
                    >
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                          value={order.orderStatus}
                          onChange={handleOrderStatusChange(order.id)}
                        >
                          <MenuItem value={"Pending"}>Pending</MenuItem>
                          <MenuItem value={"Processing"}>Processing</MenuItem>
                          <MenuItem value={"Shipping"}>Shipping</MenuItem>
                          <MenuItem value={"Shipped"}>Shipped</MenuItem>
                          <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={handleDeleteOrder(order.id)}
                    >
                      Delete Order
                    </Button>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="primary">There is no order yet.</Typography>
        </Box>
      )}
    </>
  );
};

export default OrderDashboard;
