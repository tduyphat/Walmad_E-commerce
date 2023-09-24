import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import Product from "../interfaces/Product";
import { fetchAllProductsAsync } from "../redux/reducers/productsReducers";

const ProductsByCategory = () => {
  const { id } = useParams();
  const { products, loading, error } = useAppSelector(
    (state) => state.productsReducer
  );

  const productsByCategory = products.filter(
    (product) => product.category.id == id
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync({ offset: 0, limit: 0 }));
  }, []);

  return (
    <div>
      {!productsByCategory && !error && loading && <p>Loading...</p>}
      {!productsByCategory && !loading && error && <p>Error happens!</p>}
      <h1>{productsByCategory[0].category.name}</h1>
      {!error &&
        !loading &&
        productsByCategory &&
        productsByCategory.map((product: Product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </div>
        ))}
    </div>
  );
};

export default ProductsByCategory;
