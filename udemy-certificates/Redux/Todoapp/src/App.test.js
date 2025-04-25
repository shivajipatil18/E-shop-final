import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../redux/reducers"; // Ensure this points to your root reducer
import App from "../App";

const store = configureStore({ reducer: rootReducer });

test.skip("renders App component", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/Todo App/i)).toBeInTheDocument();
});
