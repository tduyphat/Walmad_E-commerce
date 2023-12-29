import { rest } from "msw";
import { setupServer } from "msw/node";
import { usersData } from "../data/usersData";
export const access_token = "my-access-token";
export const handlers = [
  rest.post(
    `${process.env.REACT_APP_API_URL}api/v1/auth/login`,
    async (req, res, ctx) => {
      const { email } = await req.json();
      console.log(email);
      const foundUser = usersData.find((u) => u.email === email);
      if (foundUser) {
        const token = access_token + "_" + foundUser.id;
        return res(ctx.json({ access_token: token }));
      } else {
        ctx.status(401);
        return res(ctx.text("Cannot authenticate user"));
      }
    }
  ),
  rest.get(
    `${process.env.REACT_APP_API_URL}api/v1/auth/profile`,
    (req, res, ctx) => {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      const originalToken = token?.split("_")[0];
      const userId = token?.split("_")[1];
      console.log("token: ", token);
      const user = usersData.find((u) => u.id === userId);
      if (originalToken === access_token && user) {
        return res(ctx.json(user));
      } else {
        ctx.status(401);
        return res(ctx.text("Cannot authenticate user"));
      }
    }
  ),
];
const userServer = setupServer(...handlers);
export default userServer;
