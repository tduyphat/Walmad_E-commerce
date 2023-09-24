import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Category from "../interfaces/Category";

const CategorySlide: React.FC<Category> = (category) => {
  const navigate = useNavigate();
  const { id, name, image } = category;
  return (
    <Card key={id} sx={{ backgroundColor: "#F5F5F5", borderRadius: "0.5em" }}>
      <CardActionArea onClick={() => navigate(`/categories/${id}/products`)}>
        <CardMedia component="img" height="300" image={image} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategorySlide;
