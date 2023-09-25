import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

import useAppSelector from "../hooks/useAppSelector";
import Product from "../interfaces/Product";
import CardsContainer from "../components/CardsContainer";
import ProductCard from "../components/ProductCard";

const ProductsByCategory = () => {
  const [categoryName, setCatgoryName] = useState("");
  const { id } = useParams();
  const { products, loading, error } = useAppSelector(
    (state) => state.productsReducer
  );
  const productsByCategory = products.filter(
    (product) => product.category.id.toString() === id
  );

  const fetchCategoryName = async () => {
    try {
      const result = await axios.get(
        `https://api.escuelajs.co/api/v1/categories/${id}`
      );
      setCatgoryName(result.data.name);
    } catch (e) {
      const error = e as Error;
      return error.message;
    }
  };

  useEffect(() => {
    fetchCategoryName();
  });

  return (
    <>
      <Typography variant="h3">{categoryName}</Typography>
      {!productsByCategory && !error && loading && <p>Loading...</p>}
      {!productsByCategory && !loading && error && <p>Error happens!</p>}

      {!error && !loading && productsByCategory.length > 0 ? (
        <CardsContainer>
          {productsByCategory.map((product: Product) => (
            <ProductCard {...product} />
          ))}
        </CardsContainer>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i>No products in this category.</i>
        </Box>
      )}
    </>
  );
};

export default ProductsByCategory;
