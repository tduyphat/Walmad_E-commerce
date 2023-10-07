import {
  authenticateUserAsync,
  fetchUsersAsync,
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
  test("Should fetch all users", async () => {
    await store.dispatch(fetchUsersAsync());
    expect(store.getState().usersReducer.users.length).toBe(3);
  });

  test("Should login user with right credential", async () => {
    await store.dispatch(
      loginUserAsync({ email: "john@mail.com", password: "changeme" })
    );
    expect(store.getState().usersReducer.currentUser).toMatchObject(
      usersData[0]
    );
  });

  test("Should authenticate with right token", async () => {
    await store.dispatch(authenticateUserAsync(access_token + "_2"));
    expect(store.getState().usersReducer.currentUser).toMatchObject(
      usersData[1]
    );
  });

  test("Should logout user", async () => {
    await store.dispatch(
      loginUserAsync({ email: "john@mail.com", password: "changeme" })
    );
    store.dispatch(logOut());
    expect(store.getState().usersReducer.currentUser).toBe(undefined);
  });
});
