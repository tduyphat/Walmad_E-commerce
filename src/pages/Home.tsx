import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { fetchAllCategoriesAsync } from "../redux/reducers/categoriesReducer";
import Category from "../interfaces/Category";

const Home = () => {
  const { categories, loading, error } = useAppSelector(
    (state) => state.categoriesReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, []);
  return (
    <Carousel>
      {categories.map((category, index) => (
        <Box key={index} sx={{ backgroundColor: "red" }}>
          <Link to={`/categories/${category.id}/products`}>
            <h2>{category.name}</h2>
          </Link>
        </Box>
      ))}
    </Carousel>
  );
};

export default Home;
