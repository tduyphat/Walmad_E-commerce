import CartItem from "../../interfaces/CartItem";
import { categoriesData } from "./categoriesData";

export const cartData: CartItem[] = [
  {
    inventory: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "00321573-0c56-47f2-8d65-1ffc51297e66",
    title: "Luxurious Wooden Salad",
    price: 102,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    images: [
      {
        url: "https://picsum.photos/200",
        id: "e724dd89-0782-48b9-99e2-4b2412899a1b",
      },
    ],
    category: categoriesData[0],
    quantity: 1,
  },
  {
    inventory: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "01bff626-6eea-4ddd-9162-696442dbc938",
    title: "Bespoke Soft Keyboard",
    price: 74,
    description:
      "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
      images: [
        {
          url: "https://picsum.photos/200",
          id: "4c9f0bb0-6d2f-4949-9d14-5df8ed1a6175",
        },
      ],
    category: categoriesData[1],
    quantity: 2,
  },
];
