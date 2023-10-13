import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import useAppSelector from "../hooks/useAppSelector";
import ReviewProps from "../interfaces/ReviewProps";

const Review: React.FC<ReviewProps> = ({ addressForm, paymentForm }) => {
  const { name, address1, address2, state, country } = addressForm;
  const { cardName, cardNumber, expDate } = paymentForm;
  const cart = useAppSelector((state) => state.cartReducer);
  const formatCreditCardNumber = (cardNumber: string) => {
    cardNumber = cardNumber.replace(/\D/g, "");
    if (cardNumber.length < 16) {
      return "Invalid card number";
    }
    const lastFourDigits = cardNumber.slice(-4);
    const maskedNumber = "xxxx-xxxx-xxxx-" + lastFourDigits;
    return maskedNumber;
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((cartItem) => (
          <ListItem key={cartItem.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={cartItem.title}
              secondary={`Quantity: ${cartItem.quantity}`}
            />
            <Typography variant="body2">
              €{cartItem.price * cartItem.quantity}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            €{cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{name}</Typography>
          <Typography gutterBottom>
            {address1}
            {address2.length > 0 ? `, ${address2}` : ""}
            {`, ${state}`}
            {`, ${country}`}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>Card Type</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Visa</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Card holder</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{cardName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Card number</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {formatCreditCardNumber(cardNumber)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Expiry date</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{expDate}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
