import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

import ProductDetailsCard from "../components/ProductDetailsCard";
import Product from "../interfaces/Product";
import { Typography } from "@mui/material";
import CardsContainer from "../components/CardsContainer";
import ProductCard from "../components/ProductCard";
import useAppSelector from "../hooks/useAppSelector";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState<Product>();
  const { products } = useAppSelector((state) => state.productsReducer);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_API_URL}api/v1/products/${id}`
        );
        setProductDetails(result.data);
      } catch (e) {
        const error = e as AxiosError;
        setError(error.message);
      }
      setLoading(false);
    };
    fetchProductDetails();
  }, [id]);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Math.max(Number(event.target.value), 1));
  };

  return (
    <>
      {!productDetails && !error && loading && <p>Loading...</p>}
      {!productDetails && !loading && error && <p>Error happens!</p>}
      {!error && !loading && productDetails && (
        <ProductDetailsCard
          productDetails={productDetails}
          amount={amount}
          setAmount={setAmount}
          handleAmountChange={handleAmountChange}
        />
      )}
      <Typography
        variant="h4"
        color="primary"
        sx={{ marginTop: 10 }}
        gutterBottom
      >
        Similar Products
      </Typography>
      <CardsContainer>
        {products
          .filter(
            (product) => product.category.id === productDetails?.category.id
          )
          .slice(0, 4)
          .map((product: Product) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </CardsContainer>
    </>
  );
};

export default ProductDetails;
