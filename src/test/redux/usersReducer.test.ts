import {
  authenticateUserAsync,
  fetchUsersAsync,
  loginUserAsync,
} from "../../redux/reducers/userReducer";
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
  test("Should fetch all users", async () => {
    await store.dispatch(fetchUsersAsync());
    expect(store.getState().userReducer.users.length).toBe(3);
  });

  test("Should login user with right credential", async () => {
    await store.dispatch(
      loginUserAsync({ email: "john@mail.com", password: "changeme" })
    );
    expect(store.getState().userReducer.currentUser).toMatchObject(
      usersData[0]
    );
  });

  test("Should authenticate with right token", async () => {
    await store.dispatch(authenticateUserAsync(access_token + "_2"));
    expect(store.getState().userReducer.currentUser).toMatchObject(
      usersData[1]
    );
  });
});
