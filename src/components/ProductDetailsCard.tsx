import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ButtonGroup, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Carousel from "react-material-ui-carousel";

import useAppDispatch from "../hooks/useAppDispatch";
import Product from "../interfaces/Product";
import { addToCart } from "../redux/reducers/cartReducer";
import { toast } from "react-toastify";

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blueGrey[50]),
  backgroundColor: blueGrey[50],
  borderColor: blueGrey[200],
  "&:hover": {
    backgroundColor: blueGrey[100],
    borderColor: blueGrey[300],
  },
}));

const StyledInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 0,
      borderColor: blueGrey[200],
    },
    "&:hover fieldset": {
      borderColor: blueGrey[300],
    },
    "&.Mui-focused fieldset": {
      borderColor: blueGrey[500],
    },
    "& input": {
      textAlign: "center",
      width: 60,
    },
  },
});

interface ProductDetailsCardProps {
  productDetails: Product;
  amount: number;
  setAmount: (amount: number) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({
  productDetails,
  amount,
  setAmount,
  handleAmountChange,
}) => {
  const { inventory, title, description, price, images } = productDetails;
  const dispatch = useAppDispatch();
  const onAddToCart = (payload: Product) => {
    dispatch(addToCart({ product: payload, quantity: amount }));
    amount > 1
      ? toast.info(`Added ${amount} items to cart`)
      : toast.info("Added 1 item to cart");
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        {images.length > 1 ? (
          <Carousel>
            {images.map((image) => (
              <CardMedia
                key={image.id}
                component="img"
                alt={title}
                height="400"
                image={image.url}
              />
            ))}
          </Carousel>
        ) : (
          <CardMedia
            component="img"
            alt={title}
            height="400"
            image={images[0].url}
          />
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            height: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" color="primary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {description}
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            € {price}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {inventory > 0
              ? `Hurry up! Only ${inventory} left in store!`
              : "Out of stock!"}
          </Typography>
          <ButtonGroup>
            <StyledButton
              onClick={() => setAmount(amount - 1)}
              disabled={amount === 1}
            >
              <RemoveIcon fontSize="small" />
            </StyledButton>
            <StyledInput
              size="small"
              onChange={handleAmountChange}
              value={amount}
            />
            <StyledButton
              onClick={() => setAmount(amount + 1)}
              disabled={inventory <= 0 ? true : false}
            >
              <AddIcon fontSize="small" />
            </StyledButton>
          </ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={inventory <= 0 ? true : false}
            onClick={() => onAddToCart(productDetails)}
          >
            Add to Cart
            <AddShoppingCartIcon sx={{ marginLeft: 1 }} />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductDetailsCard;
