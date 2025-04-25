import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import Navbar from "../Navbar/Navbar";
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

jest.mock("../ProductSearch", () => () => <div>Mocked ProductSearch</div>);
jest.mock("../Login/Login", () => () => <div>Mocked Login</div>);
jest.mock("../Register/Register", () => () => <div>Mocked Register</div>);
jest.mock("../Modal/modal", () => ({ children, isModalOpen }) =>
  isModalOpen ? <div className="mocked-modal">{children}</div> : null
);

const middlewares = [thunk]
const mockStore = configureMockStore(...middlewares); 

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Navbar Component", () => {
  let store;

  const initialState = {
    cart: {
      products: [{ id: 1 }, { id: 2 }],
    },
    auth: {
      isAuthenticated: false,
    },
  };
  const setup = (stateOverrides = {}) => {
    const store = mockStore({ ...initialState, ...stateOverrides }); 
    return mount(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );
  };
  


  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper.find("nav").exists()).toBe(true);
  });

  it("displays product count when products exist", () => {
    const wrapper = setup();
    const countBadge = wrapper.find("span").filterWhere((span) => span.text() === "2");
    expect(countBadge.exists()).toBe(true);
  });

  it("shows 'Login / Register' when user is not logged in", () => {
    const wrapper = setup();
    expect(wrapper.text()).toContain("Login / Register");
  });

  it("shows user name and logout when user is logged in", () => {
    localStorage.setItem("user", JSON.stringify({ name: "Alice" }));
    const wrapper = setup();
    expect(wrapper.text()).toContain("Alice");
    expect(wrapper.text()).toContain("Logout");
  });

  it("opens modal on 'Login / Register' click", () => {
    const wrapper = setup();
    wrapper.find("button").filterWhere((btn) => btn.text() === "Login / Register").simulate("click");
    wrapper.update();
    expect(wrapper.find(".mocked-modal").exists()).toBe(true);
  });

  it("navigates to cart if authenticated", () => {
    const wrapper = setup({ auth: { isAuthenticated: true } });
    wrapper.find(FaShoppingCart).closest("button").simulate("click");
    expect(mockNavigate).toHaveBeenCalledWith("/cart");
  });

  it("shows modal when clicking cart without login", () => {
    const wrapper = setup({ auth: { isAuthenticated: false } });
    wrapper.find(FaShoppingCart).closest("button").simulate("click");
    wrapper.update();
    expect(wrapper.find(".mocked-modal").exists()).toBe(true);
  });

  it("logs out and reloads the page on logout click", () => {
    localStorage.setItem("user", JSON.stringify({ name: "TestUser" }));
    const reloadMock = jest.fn();
    delete window.location;
    window.location = { reload: reloadMock };

    const wrapper = setup();
    wrapper.find("button").filterWhere((btn) => btn.text() === "Logout").simulate("click");
    expect(localStorage.getItem("user")).toBeNull();
    expect(reloadMock).toHaveBeenCalled();
  });

  it("renders ProductSearch in Suspense", () => {
    const wrapper = setup();
    expect(wrapper.text()).toContain("Mocked ProductSearch");
  });

  it("saves cart to localStorage on update", () => {
    const wrapper = setup();
    wrapper.setProps({ cart: { products: [{ id: 1 }, { id: 2 }] } });
    expect(localStorage.getItem("cart")).toContain('"id":1');
  });

  it.skip("restores cart from localStorage on mount", () => {
    localStorage.setItem("cart", JSON.stringify([{ id: 10 }]));
    setup();
    const actions = store.getActions();
    expect(actions).toContainEqual({ type: "cart/setCart", payload: [{ id: 10 }] });
  });
});
