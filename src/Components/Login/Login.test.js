import React from "react";
import { shallow, mount } from "enzyme";
import Login from "../Login/Login"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../../utils/Validation";
import { login } from "../../redux/authSlice";

// Mocks
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn()
}));

jest.mock("../../utils/Validation", () => ({
  validateLoginForm: jest.fn()
}));

jest.mock("../../redux/authSlice", () => ({
  login: jest.fn()
}));

describe("Login Component", () => {
  let mockDispatch;
  let mockNavigate;
  let closeModalMock;
  let openSignUpMock;

  beforeEach(() => {
    mockDispatch = jest.fn(() => Promise.resolve({ payload: [{ id: 1, role: "user" }] }));
    mockNavigate = jest.fn();
    closeModalMock = jest.fn();
    openSignUpMock = jest.fn();

    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
    useSelector.mockReturnValue({
      status: "loading",
      error: null,
      isAuthenticated: false,
      user: null
    });

    validateLoginForm.mockReturnValue("");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const wrapper = shallow(
      <Login closeModal={closeModalMock} openSignUp={openSignUpMock} />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("shows validation error on invalid form submit", () => {
    validateLoginForm.mockReturnValue("Validation Error");
    const wrapper = mount(
      <Login closeModal={closeModalMock} openSignUp={openSignUpMock} />
    );

    wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });
    wrapper.update();
    expect(wrapper.text()).toContain("Validation Error");
  });

  it("dispatches login and navigates on successful login", async () => {
    const wrapper = mount(
      <Login closeModal={closeModalMock} openSignUp={openSignUpMock} />
    );

    wrapper.find('input#Email').simulate("change", {
      target: { value: "test@example.com" }
    });
    wrapper.find('input#password').simulate("change", {
      target: { value: "password123" }
    });

    await wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });

    expect(mockDispatch).toHaveBeenCalled();
    expect(closeModalMock).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("navigates to /adminpanel if user role is admin", async () => {
    useSelector.mockReturnValueOnce({
      status: "idle",
      error: null,
      isAuthenticated: true,
      user: { role: "admin" }
    });

    mount(
      <Login closeModal={closeModalMock} openSignUp={openSignUpMock} />
    );

    expect(mockNavigate).toHaveBeenCalledWith("/adminpanel");
  });

  it("shows login error on invalid credentials", async () => {
    mockDispatch = jest.fn(() =>
      Promise.resolve({ payload: [{ error: "Invalid" }] })
    );
    useDispatch.mockReturnValue(mockDispatch);

    const wrapper = mount(
      <Login closeModal={closeModalMock} openSignUp={openSignUpMock} />
    );

    wrapper.find('input#Email').simulate("change", {
      target: { value: "fail@example.com" }
    });
    wrapper.find('input#password').simulate("change", {
      target: { value: "wrongpass" }
    });

    await wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.text()).toContain("Invalid email or password");
    });
  });

  it("shows error and loading messages conditionally", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        auth: {
          status: "loading",
          error: "Something went wrong",
          isAuthenticated: false,
          user: null
        }
      })
    );
  
    const wrapper = mount(
      <Login closeModal={closeModalMock} openSignUp={openSignUpMock} />
    );

    expect(wrapper.text()).toContain("Loading...");
    expect(wrapper.text()).toContain("Something went wrong");
  });

  it("triggers sign up modal on button click", () => {
    const wrapper = shallow(
      <Login closeModal={closeModalMock} openSignUp={openSignUpMock} />
    );

    wrapper.find("button").at(1).simulate("click");
    expect(openSignUpMock).toHaveBeenCalled();
  });

  it("disables login button when status is loading", () => {
    useSelector.mockReturnValueOnce({
      status: "loading",
      error: null,
      isAuthenticated: false,
      user: null
    });

    const wrapper = mount(
      <Login closeModal={closeModalMock} openSignUp={openSignUpMock} />
    );

    const loginButton = wrapper.find("button[type='submit']");
    expect(loginButton.prop("disabled")).toBe(true);
  });
});
