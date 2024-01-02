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
    const cart = cartReducer(
      cartData,
      increaseQuantity("00321573-0c56-47f2-8d65-1ffc51297e66")
    );
    expect(cart[0].quantity).toBe(2);
  });

  test("Should decrease product quantity", () => {
    const cart = cartReducer(
      cartData,
      decreaseQuantity("01bff626-6eea-4ddd-9162-696442dbc938")
    );
    expect(cart[1].quantity).toBe(1);
  });

  test("Should remove when quantity is 0", () => {
    const cart = cartReducer(
      cartData,
      decreaseQuantity("00321573-0c56-47f2-8d65-1ffc51297e66")
    );
    expect(cart.length).toBe(1);
  });

  test("Should remove product from cart", () => {
    const cart = cartReducer(
      cartData,
      removeFromCart("01bff626-6eea-4ddd-9162-696442dbc938")
    );
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe("00321573-0c56-47f2-8d65-1ffc51297e66");
  });
});
