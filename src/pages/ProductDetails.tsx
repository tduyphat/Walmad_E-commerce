import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

import ProductDetailsCard from "../components/ProductDetailsCard";
import Product from "../interfaces/Product";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState<Product>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [amount, setAmount] = useState(1);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      setProductDetails(result.data);
    } catch (e) {
      const error = e as AxiosError;
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Math.max(Number(event.target.value), 1));
  };

  return (
    <div>
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
    </div>
  );
};

export default ProductDetails;
