import Product from "./Product";

interface CartItem extends Product {
  quantity: number;
}

export default CartItem;
