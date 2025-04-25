import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TodoApp from "../components/TodoApp";
import { addTask, removeTask, completedTask, fetchTasks } from "../redux/actions/action";

const mockStore = configureStore(); 

describe("TodoApp Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      tasks: [
        { id: 1, title: "Test Task", completed: false },
        { id: 2, title: "Completed Task", completed: true },
      ],
    });

    store.dispatch = jest.fn(); 
  });

  test("renders TodoApp component", () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );

    expect(screen.getByText(/Todo App/i)).toBeInTheDocument();
  });

  test("renders tasks from Redux store", () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Completed Task")).toBeInTheDocument();
  });

  test("adds a new task when 'Add Task' button is clicked", () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(store.dispatch).toHaveBeenCalledWith(addTask("New Task"));
  });

  test("marks a task as completed when 'Complete' button is clicked", () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );

    const completeButton = screen.getAllByText("Complete")[0];
    fireEvent.click(completeButton);

    expect(store.dispatch).toHaveBeenCalledWith(completedTask(1));
  });

  test("removes a task when 'Remove' button is clicked", () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );

    const removeButton = screen.getAllByText("Remove")[0];
    fireEvent.click(removeButton);

    expect(store.dispatch).toHaveBeenCalledWith(removeTask(1));
  });

  test("fetches tasks on component mount", () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchTasks());
  });
});
