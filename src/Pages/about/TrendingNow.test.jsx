// TrendingNow.test.jsx (Enzyme version)
import React from "react";
import { shallow, mount } from "enzyme";
import TrendingNow from "./TrendingNow";
import * as redux from "react-redux";
import { addToCart } from "../../redux/CartSlice";

// Mock Redux hooks
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("TrendingNow Component with Enzyme", () => {
  const mockDispatch = jest.fn();

  const mockProducts = [
    { id: 1, title: "Product 1", rating: 4.5, price: 100 },
    { id: 2, title: "Product 2", rating: 3.5, price: 200 },
    { id: 3, title: "Product 3", rating: 5.0, price: 150 },
  ];

  beforeEach(() => {
    redux.useDispatch.mockReturnValue(mockDispatch);
    redux.useSelector.mockImplementation((selector) =>
      selector({
        product: {
          filteredProducts: mockProducts,
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    const wrapper = mount(<TrendingNow />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain("Trending Now");
  });

  it("should show message when no trending products", () => {
    redux.useSelector.mockImplementation((selector) =>
      selector({
        product: {
          filteredProducts: [],
        },
      })
    );
    const wrapper = mount(<TrendingNow />);
    expect(wrapper.text()).toContain("No trending products");
  });

  it("should render only products with rating > 4", () => {
    const wrapper = mount(<TrendingNow />);
    expect(wrapper.text()).toContain("Product 1");
    expect(wrapper.text()).not.toContain("Product 2");
    expect(wrapper.text()).toContain("Product 3");
  });

  it("should dispatch addToCart action when Add to Cart button is clicked", () => {
    const wrapper = mount(<TrendingNow />);

    const addButtons = wrapper.find('[data-testid="add-to-cart-btn"]');

    expect(addButtons.length).toBeGreaterThan(0);

    addButtons.at(0).simulate("click");

    expect(mockDispatch).toHaveBeenCalled();
    expect(addToCart).toHaveBeenCalledWith(mockProducts[0]);
  });

  it("should match snapshot", () => {
    const wrapper = shallow(<TrendingNow />);
    expect(wrapper).toMatchSnapshot();
  });
});
