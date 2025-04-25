import React from "react";
import { mount } from "enzyme";
// Removed unused import of configureMockStore
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import AdminPanel from "../../Pages/Admin/AdminPanel";

import * as orderActions from "../../redux/OrderSlice";
import * as userActions from "../../redux/UserSlice";
import * as productActions from "../../redux/ProductSlice";

import { configureStore } from "@reduxjs/toolkit";

const createMockStore = (preloadedState) =>
  configureStore({
    reducer: () => preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
console.log("🛠️ createMockStore:", typeof createMockStore);
describe("AdminPanel Component", () => {
  let store;
  let wrapper;

  const mockState = {
    order: {
      allOrders: [
        {
          orderNumber: "1234",
          username: "john_doe",
          date: "2025-04-20",
          totalPrice: 2999,
          paymentMethod: "Cash on Delivery",
          shippingInformation: {
            address: "123 Main St",
            city: "Pune",
            zip: "411001",
          },
          products: [
            {
              id: 1,
              name: "Product 1",
              price: 1000,
              quantity: 2,
              image: "product1.jpg",
            },
          ],
        },
      ],
      loading: false,
      error: null,
    },
    user: {
      users: [
        { id: 1, username: "john_doe", email: "john@example.com", role: "admin" },
      ],
      loading: false,
      error: null,
    },
    product: {
      products: [],
      loading: false,
      error: null,
    },
  };
  store = createMockStore(mockState);

  beforeEach(() => {
    store = createMockStore(mockState);

    jest.spyOn(orderActions, "fetchAllOrders").mockImplementation(() => () => ({ type: "FETCH_ORDERS" }));
    jest.spyOn(userActions, "fetchAllUsers").mockImplementation(() => () => ({ type: "FETCH_USERS" }));
    jest.spyOn(productActions, "fetchProducts").mockImplementation(() => () => ({ type: "FETCH_PRODUCTS" }));

    wrapper = mount(
      <Provider store={store}>
        <AdminPanel />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders AdminPanel without crashing", () => {
    expect(wrapper.find("h2").at(0).text()).toContain("Admin Panel - All Orders");
  });

  it("dispatches fetchAllOrders, fetchAllUsers, and fetchProducts on mount", () => {
    expect(orderActions.fetchAllOrders).toHaveBeenCalled();
    expect(userActions.fetchAllUsers).toHaveBeenCalled();
    expect(productActions.fetchProducts).toHaveBeenCalled();
  });

  it("shows loading message when loading is true", () => {
    const loadingState = {
      ...mockState,
      order: { ...mockState.order, loading: true },
    };
    store = createMockStore(loadingState);

    const loadingWrapper = mount(
      <Provider store={store}>
        <AdminPanel />
      </Provider>
    );

    expect(loadingWrapper.text()).toContain("Loading data...");
  });

  it("shows error message when an error is present", () => {
    const errorState = {
      ...mockState,
      order: { ...mockState.order, error: "Something went wrong" },
    };
    store = createMockStore(errorState);

    const errorWrapper = mount(
      <Provider store={store}>
        <AdminPanel />
      </Provider>
    );

    expect(errorWrapper.text()).toContain("Error: Something went wrong");
  });

  it("shows 'No Orders Found' when no orders exist", () => {
    const noOrdersState = {
      ...mockState,
      order: { ...mockState.order, allOrders: [] },
    };
    store = createMockStore(noOrdersState);

    const noOrdersWrapper = mount(
      <Provider store={store}>
        <AdminPanel />
      </Provider>
    );

    expect(noOrdersWrapper.text()).toContain("No Orders Found");
  });

  it("renders order and user tables correctly", () => {
    expect(wrapper.find("table").length).toBeGreaterThanOrEqual(2);

    // Verify order table content
    const orderRow = wrapper.find("tbody").at(0).find("tr").at(0);
    expect(orderRow.find("td").at(0).text()).toContain("#1234");
    expect(orderRow.find("td").at(4).text()).toContain("Cash on Delivery");
    expect(orderRow.find("td").at(5).text()).toContain("123 Main St");

    // Verify user table content
    const userRow = wrapper.find("tbody").at(1).find("tr").at(0);
    expect(userRow.find("td").at(0).text()).toContain("1");
    expect(userRow.find("td").at(1).text()).toContain("john_doe");
    expect(userRow.find("td").at(2).text()).toContain("john@example.com");
  });

  it("matches snapshot", () => {
    const snapshotWrapper = mount(
      <Provider store={store}>
        <AdminPanel />
      </Provider>
    );
    expect(snapshotWrapper).toMatchSnapshot();
  });
});