import CartItem from "../../interfaces/CartItem";
import { categoriesData } from "./categoriesData";

export const cartData: CartItem[] = [
  {
    id: 1,
    title: "Luxurious Wooden Salad",
    price: 102,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    images: [
      "https://i.imgur.com/00qWleT.jpeg",
      "https://i.imgur.com/RQL19O6.jpeg",
      "https://i.imgur.com/G45P8tI.jpeg",
    ],
    category: categoriesData[0],
    quantity: 1,
  },
  {
    id: 2,
    title: "Bespoke Soft Keyboard",
    price: 74,
    description:
      "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    images: [
      "https://i.imgur.com/5iNAL9T.jpeg",
      "https://i.imgur.com/s8WRA2O.jpeg",
      "https://i.imgur.com/uDpzwEk.jpeg",
    ],
    category: categoriesData[1],
    quantity: 2,
  },
];
