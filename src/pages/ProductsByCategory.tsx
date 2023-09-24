import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import Product from "../interfaces/Product";
import { fetchAllProductsAsync } from "../redux/reducers/productsReducers";
import axios from "axios";

const ProductsByCategory = () => {
  const [categoryName, setCatgoryName] = useState("");
  const { id } = useParams();
  const { products, loading, error } = useAppSelector(
    (state) => state.productsReducer
  );

  const productsByCategory = products.filter(
    (product) => product.category.id.toString() === id
  );

  const dispatch = useAppDispatch();

  const fetchCategory = async () => {
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
    dispatch(fetchAllProductsAsync({ offset: 0, limit: 0 }));
  }, []);

  useEffect(() => {
    fetchCategory();
  })

  return (
    <div>
      <h1>{categoryName}</h1>
      {!productsByCategory && !error && loading && <p>Loading...</p>}
      {!productsByCategory && !loading && error && <p>Error happens!</p>}
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
