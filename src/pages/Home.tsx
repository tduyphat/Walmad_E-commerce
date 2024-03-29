import React from "react";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import CategorySlide from "../components/CategorySlide";
import CardsContainer from "../components/CardsContainer";
import Product from "../interfaces/Product";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { categories, loading, error } = useAppSelector(
    (state) => state.categoriesReducer
  );
  const { products } = useAppSelector((state) => state.productsReducer);
  const [limit, setLimit] = useState(4);
  const remainingCategories = categories ? categories.length - limit : 0;
  const handleSeeMore = () => {
    setLimit(limit + 4);
  };
  return (
    <>
      {!error && loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />{" "}
        </Box>
      )}
      {!loading && error && <Typography>Error happens!</Typography>}
      {categories.length > 0 && products.length > 0 && !loading && !error && (
        <>
          {" "}
          <Typography variant="h3" color="primary" gutterBottom>
            Products By Category
          </Typography>
          <Grid container spacing={2}>
            {categories.slice(0, limit).map((category) => (
              <Grid item xs={12} sm={6} key={category.id}>
                <CategorySlide key={category.id} {...category} />
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            justifyContent="center"
            sx={{ marginTop: 2, marginBottom: 2 }}
          >
            {remainingCategories > 0 && (
              <Button onClick={handleSeeMore} variant="outlined">
                See More
              </Button>
            )}
          </Grid>
          <Typography variant="h4" color="primary" gutterBottom>
            Most Recent Products
          </Typography>
          <CardsContainer>
            {products.slice(-4).map((product: Product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </CardsContainer>{" "}
        </>
      )}
    </>
  );
}
