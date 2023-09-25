import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import Carousel from "react-material-ui-carousel";
import Product from "../interfaces/Product";

const ProductDetailsCard: React.FC<Product> = (productDetails) => {
  const { title, description, price, images } = productDetails;
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        {images.length > 1 ? (
          <Carousel>
            {images.map((image) => (
              <CardMedia
                component="img"
                alt={title}
                height="400"
                image={image}
              />
            ))}
          </Carousel>
        ) : (
          <CardMedia
            component="img"
            alt={title}
            height="400"
            image={images[0]}
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
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {description}
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            € {price}
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Add to Cart
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductDetailsCard;
