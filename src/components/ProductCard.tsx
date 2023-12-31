import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Product from "../interfaces/Product";

const ProductCard: React.FC<Product> = (product) => {
  const { id, title, images, price } = product;
  const navigate = useNavigate();
  return (
    <Card sx={{ borderRadius: "0.5em" }}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
        onClick={() => navigate(`/products/${id}`)}
      >
        <CardMedia
          component="img"
          alt={title}
          height="200"
          image={images[0].url}
        />
        <CardContent>
          <Typography variant="body1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="primary">
            € {price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
