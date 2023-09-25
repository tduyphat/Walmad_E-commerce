import React from "react";
import { useParams } from "react-router-dom";

import useAppSelector from "../hooks/useAppSelector";
import ProductDetailsCard from "../components/ProductDetailsCard";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading, error } = useAppSelector(
    (state) => state.productsReducer
  );

  const productDetails = products.find(
    (product) => product.id.toString() === id
  );

  return (
    <div>
      {!productDetails && !error && loading && <p>Loading...</p>}
      {!productDetails && !loading && error && <p>Error happens!</p>}
      {!error && !loading && productDetails && (
        <ProductDetailsCard {...productDetails} />
      )}
    </div>
  );
};

export default ProductDetails;
