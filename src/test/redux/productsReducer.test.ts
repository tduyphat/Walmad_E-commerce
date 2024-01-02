import CreateProductInput from "../../interfaces/CreateProductInput";
import UpdateProductInput from "../../interfaces/UpdateProductInput";
import productsReducer, {
  createProductAsync,
  deleteProductAsync,
  fetchAllProductsAsync,
  sortByPrice,
  sortByTitle,
  updateProductAsync,
} from "../../redux/reducers/productsReducers";
import { createStore } from "../../redux/store";
import { categoriesData } from "../data/categoriesData";
import { productsData } from "../data/productsData";
import productServer from "../shared/productServer";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => productServer.listen());

afterEach(() => productServer.resetHandlers());

afterAll(() => productServer.close());

describe("Test normal actions in productsReducer", () => {
  test("Should sort the products by price asc", () => {
    const state = {
      products: productsData,
      loading: false,
      error: "",
    };
    const productsReducerState = productsReducer(
      state,
      sortByPrice("asc")
    ).products;
    expect(productsReducerState[0]).toBe(productsData[2]);
    expect(productsReducerState[1]).toBe(productsData[1]);
    expect(productsReducerState[2]).toBe(productsData[0]);
  });

  test("Should sort the products by price desc", () => {
    const state = {
      products: productsData,
      loading: false,
      error: "",
    };
    const productsReducerState = productsReducer(
      state,
      sortByPrice("desc")
    ).products;
    expect(productsReducerState[0]).toBe(productsData[0]);
    expect(productsReducerState[1]).toBe(productsData[1]);
    expect(productsReducerState[2]).toBe(productsData[2]);
  });

  test("Should sort the products by title asc", () => {
    const state = {
      products: productsData,
      loading: false,
      error: "",
    };
    const productsReducerState = productsReducer(
      state,
      sortByTitle("asc")
    ).products;
    expect(productsReducerState[0]).toBe(productsData[1]);
    expect(productsReducerState[1]).toBe(productsData[2]);
    expect(productsReducerState[2]).toBe(productsData[0]);
  });

  test("Should sort the products by title desc", () => {
    const state = {
      products: productsData,
      loading: false,
      error: "",
    };
    const productsReducerState = productsReducer(
      state,
      sortByTitle("desc")
    ).products;
    expect(productsReducerState[0]).toBe(productsData[0]);
    expect(productsReducerState[1]).toBe(productsData[2]);
    expect(productsReducerState[2]).toBe(productsData[1]);
  });
});

describe("Test async thunk actions in productsReducer", () => {
  test("Should fetch all products with pagination", async () => {
    await store.dispatch(
      fetchAllProductsAsync({
        limit: 3,
        offset: 0,
        sortType: "byTitle",
        sortOrder: "asc",
      })
    );
    expect(store.getState().productsReducer.products.length).toBe(3);
  });

  test("Should delete an existing product", async () => {
    const resultAction = await store.dispatch(
      deleteProductAsync("00321573-0c56-47f2-8d65-1ffc51297e66")
    );
    expect(resultAction.payload).toBe("00321573-0c56-47f2-8d65-1ffc51297e66");
  });

  test("Should delete a non-existing product", async () => {
    const resultAction = await store.dispatch(
      deleteProductAsync("2f382278-9892-4102-9cc9-0815752c84e5")
    );
    expect(typeof resultAction.payload).toBe("string");
  });

  test("Should create a product", async () => {
    const input: CreateProductInput = {
      inventory: 100,
      title: "test product",
      description: "test product",
      price: 100,
      categoryId: "090c67d4-c9ea-48e9-9a90-51ce873da540",
      images: [
        {
          url: "https://picsum.photos/200",
        },
      ],
    };
    await store.dispatch(createProductAsync(input));
    expect(store.getState().productsReducer.products.length).toBe(1);
  });

  test("Should not create a product with incorrect input", async () => {
    const input: CreateProductInput = {
      inventory: -1,
      title: "test product",
      description: "test product",
      price: 100,
      categoryId: "2f382278-9892-4102-9cc9-0815752c84e5",
      images: [
        {
          url: "https://picsum.photos/200",
        },
      ],
    };
    await store.dispatch(createProductAsync(input));
    expect(store.getState().productsReducer.products.length).toBe(0);
  });

  test("Should update product", async () => {
    const input: UpdateProductInput = {
      id: "00321573-0c56-47f2-8d65-1ffc51297e66",
      update: {
        inventory: 100,
        title: "Luxurious Wooden Table",
        price: 103,
        description:
          "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
        images: [
          {
            url: "https://picsum.photos/200",
          },
        ],
        categoryId: "090c67d4-c9ea-48e9-9a90-51ce873da540",
      },
    };
    const action = await store.dispatch(updateProductAsync(input));
    // expect(productsData[0].price).toBe(200);
    expect(action.payload).toMatchObject({
      inventory: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: "00321573-0c56-47f2-8d65-1ffc51297e66",
      title: "Luxurious Wooden Table",
      price: 103,
      description:
        "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
      images: [
        {
          url: "https://picsum.photos/200",
          id: "e724dd89-0782-48b9-99e2-4b2412899a1b",
        },
      ],
      category: categoriesData[0],
    });
  });
});
