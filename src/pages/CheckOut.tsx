import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAppDispatch from "../hooks/useAppDispatch";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import ReviewOrder from "../components/ReviewOrder";
import AddressFormInput from "../interfaces/AddressFormInput";
import PaymentFormInput from "../interfaces/PaymentFormInput";
import CartItem from "../interfaces/CartItem";
import OrderInput from "../interfaces/OrderInput";
import OrderProductInput from "../interfaces/OrderProductInput";
import useAppSelector from "../hooks/useAppSelector";
import { createOrderAsync } from "../redux/reducers/ordersReducer";
import { emptyCart } from "../redux/reducers/cartReducer";

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  const steps = ["Shipping address", "Payment details", "Review your order"];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            addressForm={addressForm}
            handleAddressFormChange={handleAddressFormChange}
          />
        );
      case 1:
        return (
          <PaymentForm
            paymentForm={paymentForm}
            handlePaymentFormChange={handlePaymentFormChange}
          />
        );
      case 2:
        return (
          <ReviewOrder addressForm={addressForm} paymentForm={paymentForm} />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  const intitalAddressForm: AddressFormInput = {
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  };

  const intitalPaymentForm: PaymentFormInput = {
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  };

  const [addressForm, setAddressForm] = useState(intitalAddressForm);
  const [paymentForm, setPaymentForm] = useState(intitalPaymentForm);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      createOrder();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleAddressFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddressForm({ ...addressForm, [event.target.name]: event.target.value });
  };

  const handlePaymentFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentForm({ ...paymentForm, [event.target.id]: event.target.value });
  };

  const createOrderInput = (cartItems: CartItem[]): OrderInput => {
    const orderProductsFromCartItems: OrderProductInput[] = cartItems.map(
      (cartItem) => ({
        productId: cartItem.id,
        quantity: cartItem.quantity,
      })
    );

    return {
      orderProducts: orderProductsFromCartItems,
      orderStatus: "Pending",
    };
  };

  const createOrder = async () => {
    const result = await dispatch(createOrderAsync(createOrderInput(cart)));
    if (result.payload?.hasOwnProperty("id")) {
      dispatch(emptyCart());
      localStorage.removeItem("cart");
      toast.success("Order placed successfully!");
    } else {
      toast.error("Cannot place order!");
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                We have emailed your order confirmation, and will send you an
                update when your order has shipped.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Checkout;
