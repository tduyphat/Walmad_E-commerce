import React from "react";

import ItemInCart from "./ItemInCart";
import useAppSelector from "../hooks/useAppSelector";

const Cart = () => {
  const cart = useAppSelector((state) => state.cartReducer);
  return (
    <aside style={{ width: 500, padding: 20 }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>No items in cart.</p> : null}
      {cart.map((item) => (
        <ItemInCart
          {...item}
          key={item.id}          
        />
      ))}
      <h2>Total: € {cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}</h2>
    </aside>
  );
};

export default Cart;
