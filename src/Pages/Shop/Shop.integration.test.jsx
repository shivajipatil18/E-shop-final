import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { mount } from "enzyme";
import Shop from "../../Pages/Shop/Shop";
import * as utils from "../../utils/Utils";

jest.mock("../../Components/ProductCard/ProductCard", () => ({ product }) => (
  <div data-testid="product-card">{product.title}</div>
));

jest.mock("../../Components/CatagoryFiltters/CatagoryFilters", () => () => (
  <div data-testid="category-filter">Mock Category Filter</div>
));

jest.mock("../../utils/Utils", () => ({
  setupInfiniteScroll: jest.fn(),
}));

const mockStore = configureMockStore([]);

describe("Shop Component Integration Tests with Enzyme", () => {
  let store;
  const mockProducts = [
    { id: 1, title: "Product A", price: 10, category: "electronics" },
    { id: 2, title: "Product B", price: 20, category: "clothing" },
    { id: 3, title: "Product C", price: 15, category: "electronics" },
    { id: 4, title: "Product D", price: 25, category: "clothing" },
  ];

  beforeEach(() => {
    store = mockStore({
      product: {
        filteredProducts: mockProducts,
        category: "",
      },
      categories: ["electronics", "clothing"],
    });

    jest.spyOn(utils, "setupInfiniteScroll").mockImplementation((products) =>
      products.slice(0, 3)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Shop container and heading", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Shop />
      </Provider>
    );

    expect(wrapper.find('[data-testid="shop-container"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="shop-heading"]').text()).toBe("Shop");
  });

  it("renders category filter section", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Shop />
      </Provider>
    );

    expect(wrapper.find('[data-testid="category-filter"]').exists()).toBe(true);
  });

  it("renders initial visible product cards (3 due to mock)", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Shop />
      </Provider>
    );

    const productCards = wrapper.find('[data-testid="product-card"]');
    expect(productCards).toHaveLength(3);
    expect(productCards.at(0).text()).toBe("Product A");
    expect(productCards.at(1).text()).toBe("Product B");
    expect(productCards.at(2).text()).toBe("Product C");
  });

  it("sorts products by price low to high", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Shop />
      </Provider>
    );

    const dropdown = wrapper.find("select").at(0);
    dropdown.simulate("change", { target: { value: "lowToHigh" } });

    const sortedTitles = wrapper
      .find('[data-testid="product-card"]')
      .map((card) => card.text());
    expect(sortedTitles).toEqual(["Product A", "Product C", "Product B"]);
  });

  it("sorts products by price high to low", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Shop />
      </Provider>
    );

    const dropdown = wrapper.find("select").at(0);
    dropdown.simulate("change", { target: { value: "highToLow" } });

    const sortedTitles = wrapper
      .find('[data-testid="product-card"]')
      .map((card) => card.text());
    expect(sortedTitles).toEqual(["Product D", "Product B", "Product C"]);
  });

  it("displays 'Loading more products...' if not all are loaded", () => {
    utils.setupInfiniteScroll.mockReturnValue(mockProducts.slice(0, 2)); // Simulate not all products loaded
    const wrapper = mount(
      <Provider store={store}>
        <Shop />
      </Provider>
    );

    expect(wrapper.text()).toContain("Loading more products...");
  });

  it("does not display 'Loading more products...' if all products are visible", () => {
    utils.setupInfiniteScroll.mockReturnValue(mockProducts); // Simulate all products loaded
    const wrapper = mount(
      <Provider store={store}>
        <Shop />
      </Provider>
    );

    expect(wrapper.text()).not.toContain("Loading more products...");
  });
});