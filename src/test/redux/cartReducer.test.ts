import {
  addToCart,
  removeOneFromCart,
  removeFromCart,
} from "../../redux/reducers/cartReducer";
import cartReducer from "../../redux/reducers/cartReducer";
import CartItem from "../../interfaces/CartItem";

describe("cartReducer", () => {
  let initialState: CartItem[];

  beforeEach(() => {
    initialState = [
      {
        id: 1,
        title: "Product 1",
        price: 10.0,
        description: "Description for Product 1",
        category: { id: 1, name: "Category 1", image: "image1.jpg" },
        images: ["image1.jpg"],
        quantity: 2,
      },
      {
        id: 2,
        title: "Product 2",
        price: 15.0,
        description: "Description for Product 2",
        category: { id: 2, name: "Category 2", image: "image2.jpg" },
        images: ["image2.jpg"],
        quantity: 3,
      },
    ];
  });

  it("should handle ADD_TO_CART", () => {
    const action = addToCart({
      product: {
        id: 3,
        title: "Product 3",
        price: 20,
        description: "Description for Product 3",
        category: { id: 3, name: "Category 3", image: "image3.jpg" },
        images: ["image3.jpg"],
      },
      quantity: 1,
    });
    const newState = cartReducer(initialState, action);

    expect(newState).toHaveLength(3);
    expect(newState[2]).toEqual({
      id: 3,
      title: "Product 3",
      price: 20,
      description: "Description for Product 3",
      category: { id: 3, name: "Category 3", image: "image3.jpg"},
      images: ["image3.jpg"],
      quantity: 1,
    });
  });

  it("should handle REMOVE_ONE_FROM_CART", () => {
    const action = removeOneFromCart(2);
    const newState = cartReducer(initialState, action);

    expect(newState).toHaveLength(2);
    expect(newState[1].quantity).toBe(2);
  });

  it("should handle REMOVE_FROM_CART", () => {
    const action = removeFromCart(1);
    const newState = cartReducer(initialState, action);

    expect(newState).toHaveLength(1);
    expect(newState[0].id).toBe(2);
  });
});
