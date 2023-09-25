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
    <Card>
      <CardActionArea
        sx={{
          height: 340,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
        onClick={() => navigate(`/products/${id}`)}
      >
        <CardMedia component="img" alt={title} height="200" image={images[0]} />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h6" color="primary">
            € {price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
