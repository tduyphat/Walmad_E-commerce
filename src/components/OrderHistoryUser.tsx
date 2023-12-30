import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Order from "../interfaces/Order";

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

interface OrderHistoryUserProps {
  orders: Order[];
  cancelOrder: (id: string) => void;
}

const OrderHistoryUser: React.FC<OrderHistoryUserProps> = ({
  orders,
  cancelOrder,
}) => {
  return (
    <>
      {orders.map((order) => {
        const orderDate = new Date(order.createdAt.toString());
        const currentTime = new Date();
        const timeDifference =
          (currentTime.valueOf() - orderDate.valueOf()) / (1000 * 60 * 60);
        return (
          <Accordion key={order.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Order Date:{" "}
                {formatDateTime(new Date(order.createdAt.toString()))}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Order ID" />
                  <Typography variant="subtitle1">{order.id}</Typography>
                </ListItem>
                {order.orderProducts.map((orderProduct) => (
                  <ListItem key={orderProduct.product.id} sx={{ py: 1, px: 0 }}>
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
                    {order.orderStatus}
                  </Typography>
                </ListItem>
                {timeDifference < 2 && order.orderStatus !== "Cancelled" && (
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Cancel Order
                    </Button>
                  </ListItem>
                )}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default OrderHistoryUser;
