import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { mount } from "enzyme";
import Shop from "./Shop";
import * as utils from "../../utils/Utils";

jest.mock("../../Components/ProductCard/ProductCard", () => ({ product }) => (
  <div data-testid="product-card">{product.name}</div>
));

jest.mock("../../Components/CatagoryFiltters/CatagoryFilters", () => () => (
  <div data-testid="category-filter">Mock Category Filter</div>
));

jest.mock("../../utils/Utils", () => ({
  setupInfiniteScroll: jest.fn(),
}));

const mockStore = configureMockStore([]);

describe("Shop Component", () => {
  let store;
  const mockProducts = [
    { id: 1, name: "Product 1", price: 100, category: "electronics" },
    { id: 2, name: "Product 2", price: 50, category: "books" },
    { id: 3, name: "Product 3", price: 150, category: "electronics" },
  ];

  beforeEach(() => {
    store = mockStore({
      product: {
        filteredProducts: mockProducts,
        category: "",
      },
      categories: ["electronics", "books"],
    });

    jest.spyOn(utils, "setupInfiniteScroll").mockImplementation((products) =>
      products.slice(0, 2)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    utils.setupInfiniteScroll.mockReset(); // Reset the mock implementation
  });

  it("should render the Shop component without crashing", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Shop />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render product cards", () => {
    utils.setupInfiniteScroll.mockReturnValue(mockProducts.slice(0, 2)); // Mock infinite scroll to return 2 products
    const wrapper = mount(
      <Provider store={store}>
        <Shop />
      </Provider>
    );
    const productCards = wrapper.find('[data-testid="product-card"]');
    expect(productCards).toHaveLength(2); // Based on mocked infinite scroll
    expect(productCards.at(0).text()).toBe("Product 1");
    expect(productCards.at(1).text()).toBe("Product 2");
  });

  it("should render the category filter component", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Shop />
      </Provider>
    );
    expect(wrapper.find('[data-testid="category-filter"]').exists()).toBe(true);
  });

  it("should render sort dropdown and change sortOrder", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Shop />
      </Provider>
    );
    const select = wrapper.find("select").at(0);
    expect(select.prop("value")).toBe("");

    select.simulate("change", { target: { value: "lowToHigh" } });

    // Re-fetch updated prop
    expect(wrapper.find("select").at(0).prop("value")).toBe("lowToHigh");
  });

  it("should show loading more products if not all are visible", () => {
    utils.setupInfiniteScroll.mockReturnValue(mockProducts.slice(0, 2)); // Mock only 2 products visible
    const wrapper = mount(
      <Provider store={store}>
        <Shop />
      </Provider>
    );
    expect(wrapper.text()).toContain("Loading more products...");
  });

  it("should not show loading more products if all are visible", () => {
    utils.setupInfiniteScroll.mockReturnValue(mockProducts); // Mock all products visible
    const wrapper = mount(
      <Provider store={store}>
        <Shop />
      </Provider>
    );
    expect(wrapper.text()).not.toContain("Loading more products...");
  });
});