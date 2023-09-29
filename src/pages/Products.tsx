import React, { useEffect, useState } from "react";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  deleteProductAsync,
  fetchAllProductsAsync,
  sortByPrice,
} from "../redux/reducers/productsReducers";
import Product from "../interfaces/Product";
import { addToCart } from "../redux/reducers/cartReducer";

const Products = () => {
  const { products, loading, error } = useAppSelector(
    (state) => state.productsReducer
  );
  const cart = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync({ offset: 0, limit: 0 }));
  }, []);

  const onAddToCart = (payload: Product) => {
    dispatch(addToCart({ product: payload, quantity: 1 }));
  };

  const onSortAsc = () => {
    dispatch(sortByPrice("asc"));
  };

  // const onAddNew = () => {
  //   dispatch(
  //     addProduct({
  //       id: "wdfsdfsd",
  //       price: 50,
  //       title: "sdfsdf",
  //       description: "sdfsd",
  //     })
  //   );
  // };

  const onDelete = (id: number) => {
    dispatch(deleteProductAsync(id));
    // dispatch(fetchAllProductsAsync({ offset: 0, limit: 0 }));
  };

  console.log(products);
  return (
    <div>
      {/* <button onClick={onAddNew}>Add new product</button> */}
      <button onClick={onSortAsc}>Sort ASC</button>
      <p>Items in cart</p>
      {cart &&
        cart.map((item) => (
          <div key={item.id}>
            <li>
              <p>{item.title}</p>
              <p>{item.quantity}</p>
            </li>
          </div>
        ))}
      {loading && <p>Loading...</p>}
      {products &&
        products.map((p) => (
          <div key={p.id}>
            {p.title} {p.price}
            <button onClick={() => onAddToCart(p)}>Add to cart</button>
            <button onClick={() => onDelete(p.id)}>delete product</button>
          </div>
        ))}
    </div>
  );
};

export default Products;
