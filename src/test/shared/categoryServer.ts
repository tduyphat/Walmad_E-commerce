import { rest } from "msw";
import { setupServer } from "msw/node";
import { categoriesData } from "../data/categoriesData";

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}api/v1/categories`, (req, res, ctx) => {
    return res(ctx.json(categoriesData));
  }),
];
const categoryServer = setupServer(...handlers);
export default categoryServer;