// import React from "react";
// import { mount } from "enzyme";
// import { Provider } from "react-redux";
// import configureMockStore from "redux-mock-store";
// import * as reactRedux from "react-redux";
// import thunk from "redux-thunk";
// import CategoryFilter from "../CategoryFilter/CategoryFilter";
// import { setCategory, setFilteredProducts } from "../../redux/ProductSlice";

// jest.mock("../../redux/ProductSlice", () => ({
//   setCategory: jest.fn((value) => ({ type: "SET_CATEGORY", payload: value })),
//   setFilteredProducts: jest.fn((value) => ({
//     type: "SET_FILTERED_PRODUCTS",
//     payload: value,
//   })),
// }));

// const mockStore = configureMockStore([thunk]);

// const mockInitialState = {
//   product: {
//     category: "",
//     price: { min: 0, max: 1000 },
//     products: [
//       { id: 1, category: "electronics", price: 100 },
//       { id: 2, category: "jewelery", price: 150 },
//       { id: 3, category: "men's clothing", price: 300 },
//     ],
//   },
// };

// let store;
// let wrapper;

// beforeEach(() => {
//   store = mockStore(mockInitialState);

//   jest.spyOn(reactRedux, "useDispatch").mockReturnValue(jest.fn());
//   jest.spyOn(reactRedux, "useSelector").mockImplementation((cb) =>
//     cb(mockInitialState)
//   );

//   wrapper = mount(
//     <Provider store={store}>
//       <CategoryFilter />
//     </Provider>
//   );
// });

// afterEach(() => {
//   jest.clearAllMocks();
//   if (wrapper?.unmount) wrapper.unmount();
// });

// describe("CategoryFilter Component", () => {
//   it("renders the correct default selected category", () => {
//     const select = wrapper.find("select");
//     expect(select.props().value).toBe("");
//   });

//   it("updates the selected category value on change", () => {
//     const select = wrapper.find("select");
//     select.simulate("change", { target: { value: "jewelery" } });

//     expect(setCategory).toHaveBeenCalledWith("jewelery");
//     expect(setFilteredProducts).toHaveBeenCalled();
//   });

//   it("filters products correctly when price range changes", () => {
//     const updatedState = {
//       ...mockInitialState,
//       product: {
//         ...mockInitialState.product,
//         price: { min: 100, max: 150 },
//       },
//     };

//     jest.spyOn(reactRedux, "useSelector").mockImplementation((cb) =>
//       cb(updatedState)
//     );

//     wrapper = mount(
//       <Provider store={store}>
//         <CategoryFilter />
//       </Provider>
//     );

//     const select = wrapper.find("select");
//     select.simulate("change", { target: { value: "electronics" } });

//     expect(setCategory).toHaveBeenCalledWith("electronics");
//     expect(setFilteredProducts).toHaveBeenCalledWith([
//       { id: 1, category: "electronics", price: 100 },
//     ]);
//   });

//   it("does not filter products if no category is selected", () => {
//     const select = wrapper.find("select");
//     select.simulate("change", { target: { value: "" } });

//     expect(setCategory).toHaveBeenCalledWith("");
//     expect(setFilteredProducts).toHaveBeenCalledWith([
//       { id: 1, category: "electronics", price: 100 },
//       { id: 2, category: "jewelery", price: 150 },
//       { id: 3, category: "men's clothing", price: 300 },
//     ]);
//   });

//   it("handles empty product list gracefully", () => {
//     const updatedState = {
//       ...mockInitialState,
//       product: {
//         ...mockInitialState.product,
//         products: [],
//       },
//     };

//     jest.spyOn(reactRedux, "useSelector").mockImplementation((cb) =>
//       cb(updatedState)
//     );

//     wrapper = mount(
//       <Provider store={store}>
//         <CategoryFilter />
//       </Provider>
//     );

//     const select = wrapper.find("select");
//     select.simulate("change", { target: { value: "electronics" } });

//     expect(setFilteredProducts).toHaveBeenCalledWith([]);
//   });

//   it("renders without crashing when no price range is provided", () => {
//     const updatedState = {
//       ...mockInitialState,
//       product: {
//         ...mockInitialState.product,
//         price: undefined,
//       },
//     };

//     jest.spyOn(reactRedux, "useSelector").mockImplementation((cb) =>
//       cb(updatedState)
//     );

//     wrapper = mount(
//       <Provider store={store}>
//         <CategoryFilter />
//       </Provider>
//     );

//     expect(wrapper.exists()).toBe(true);
//   });
// });
