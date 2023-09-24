import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import Product from "../interfaces/Product";
import { fetchAllProductsAsync } from "../redux/reducers/productsReducers";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading, error } = useAppSelector(
    (state) => state.productsReducer
  );

  const productDetails = products.find((product) => product.id == id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync({ offset: 0, limit: 0 }));
  }, []);

  return (
    <div>
      {!productDetails && !error && loading && <p>Loading...</p>}
      {!productDetails && !loading && error && <p>Error happens!</p>}
      {!error && !loading && productDetails && (
        <div>
          <p>{productDetails.title}</p>
          <p>{productDetails.price}</p>
          <p>{productDetails.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
