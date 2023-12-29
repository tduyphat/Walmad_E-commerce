import Product from "../../interfaces/Product";
import { categoriesData } from "./categoriesData";

export const productsData: Product[] = [
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
  },
  {
    inventory: 0,
    title: "Books Product 1",
    price: 11,
    description: "Description for Books Product 1",
    category: {
      name: "Books",
      image: "https://picsum.photos/200",
      id: "78bdb026-c81b-4e82-9ff0-405996292240",
    },
    images: [
      {
        url: "https://picsum.photos/200",
        id: "b87cf2b4-b32a-4b5d-81c0-721de6ea0949",
      },
    ],
    id: "bd711c33-280f-4079-ad39-eec98ee2f19a",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
