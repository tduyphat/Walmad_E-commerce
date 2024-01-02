import { fetchAllCategoriesAsync } from "../../redux/reducers/categoriesReducer";
import { createStore } from "../../redux/store";
import categoryServer from "../shared/categoryServer";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => categoryServer.listen());

afterEach(() => categoryServer.resetHandlers());

afterAll(() => categoryServer.close());

describe("Test async thunk actions in categoriesReducer", () => {
  test("Should fetch all categories", async () => {
    await store.dispatch(fetchAllCategoriesAsync());
    expect(store.getState().categoriesReducer.categories.length).toBe(6);
  });
});
