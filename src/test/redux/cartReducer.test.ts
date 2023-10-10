import cartReducer, {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/reducers/cartReducer";
import { cartData } from "../data/cartData";
import { productsData } from "../data/productsData";

describe("Test cartReducer normal action", () => {
  test("Should add new product to cart", () => {
    const cart = cartReducer(
      cartData,
      addToCart({ product: productsData[2], quantity: 1 })
    );
    expect(cart.length).toBe(3);
  });

  test("Should not add but increase same product in cart", () => {
    const cart = cartReducer(
      cartData,
      addToCart({ product: productsData[1], quantity: 2 })
    );
    expect(cart.length).toBe(2);
    expect(cart[1].quantity).toBe(4);
  });

  test("Should increase product quantity", () => {
    const cart = cartReducer(cartData, increaseQuantity(1));
    expect(cart[0].quantity).toBe(2);
  });

  test("Should decrease product quantity", () => {
    const cart = cartReducer(cartData, decreaseQuantity(2));
    expect(cart[1].quantity).toBe(1);
  });

  test("Should remove when quantity is 0", () => {
    const cart = cartReducer(cartData, decreaseQuantity(1));
    expect(cart.length).toBe(1);
  });
  
  test("Should remove product from cart", () => {
    const cart = cartReducer(cartData, removeFromCart(2));
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(1);
  });
});
