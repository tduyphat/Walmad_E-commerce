import { rest } from "msw";
import { setupServer } from "msw/node";
import { productsData } from "../data/productsData";
import CreateProductInput from "../../interfaces/CreateProductInput";
import Product from "../../interfaces/Product";
import { categoriesData } from "../data/categoriesData";
import ProductImageCreate from "../../interfaces/ProductImageCreate";

export const access_token = "my-access-token";

const imageTransform = (imageArray: ProductImageCreate[]) => {
  const result = [];
  for (const item in imageArray) {
    const imageObject = {
      url: item,
      id: crypto.randomUUID(),
    };
    result.push(imageObject);
  }
  return result;
};

export const handlers = [
  rest.delete(
    `${process.env.REACT_APP_API_URL}api/v1/products/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;
      if (productsData.find((product) => product.id === id)) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),
  rest.post(
    `${process.env.REACT_APP_API_URL}api/v1/products`,
    async (req, res, ctx) => {
      const input: CreateProductInput = await req.json();
      const category = categoriesData.find(
        (category) => category.id === input.categoryId
      );
      if (category) {
        const newProduct: Product = {
          id: crypto.randomUUID(),
          images: imageTransform(input.images),
          title: input.title,
          description: input.description,
          category,
          price: input.price,
          inventory: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        productsData.push(newProduct);
        return res(ctx.json(newProduct));
      } else {
        ctx.status(400);
        ctx.json({
          message: [
            "price must be a positive number",
            "images must contain at least 1 elements",
            "each value in images must be a URL address",
            "images must be an array",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      }
    }
  ),
  rest.patch(
    `${process.env.REACT_APP_API_URL}api/v1/products/:id`,
    async (req, res, ctx) => {
      const update = await req.json();
      const { id } = req.params;
      const index = productsData.findIndex((product) => product.id === id);
      if (index > -1) {
        productsData[index] = {
          ...productsData[index],
          ...update,
        };
        return res(ctx.json(productsData[index]));
      } else {
        ctx.status(400);
        res(
          ctx.json({
            message: [
              "price must be a positive number",
              "images must contain at least 1 elements",
              "each value in images must be a URL address",
              "images must be an array",
            ],
            error: "Bad Request",
            statusCode: 400,
          })
        );
      }
    }
  ),
];

const productServer = setupServer(...handlers);

export default productServer;
