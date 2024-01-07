import {
  authenticateUserAsync,
  logOut,
  loginUserAsync,
} from "../../redux/reducers/usersReducer";
import { createStore } from "../../redux/store";
import { usersData } from "../data/usersData";
import server, { access_token } from "../shared/userServer";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Test usersReducer async actions", () => {
  test("Should login user with right credential", async () => {
    await store.dispatch(
      loginUserAsync({ email: "superadmin@gmail.com", password: "SuperAdmin1234" })
    );
    expect(store.getState().usersReducer.currentUser).toBeDefined();
  });

  test("Should authenticate with right token", async () => {
    await store.dispatch(authenticateUserAsync(access_token + "_347aa0ba-fafa-4d17-a167-c7bb71904bf5"));
    expect(store.getState().usersReducer.currentUser).toBeDefined();
  });

  test("Should logout user", async () => {
    await store.dispatch(
      loginUserAsync({ email: "superadmin@gmail.com", password: "SuperAdmin1234" })
    );
    store.dispatch(logOut());
    expect(store.getState().usersReducer.currentUser).toBe(undefined);
  });
});
