import { fetchAllCategoriesAsync } from "../../redux/reducers/categoriesReducer";
import { createStore } from "../../redux/store";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

describe("Test async thunk actions in categoriesReducer", () => {
  test("Should fetch all categories", async () => {
    await store.dispatch(fetchAllCategoriesAsync());
    expect(
      store.getState().categoriesReducer.categories.length
    ).toBeGreaterThan(1);
  });
});
