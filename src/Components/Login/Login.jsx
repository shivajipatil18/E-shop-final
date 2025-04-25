import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../../utils/Validation";

const Login = ({ openSignUp, closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // Check if user is already authenticated
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/adminpanel");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate form
    const errorMessage = validateLoginForm({ email, password });
    if (errorMessage) {
      setValidationError(errorMessage);
      return;
    }

    setValidationError(""); // Reset validation error

    // Dispatch login action
    try {
      const userData = await dispatch(login({ email, password }));
      const loggedInUser = userData?.payload?.[0]; 

      if (loggedInUser?.id) {
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        closeModal();

        if (loggedInUser.role === "admin") {
          navigate("/adminpanel");
        } else {
          navigate("/");
        }
      } else {
        setValidationError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setValidationError("Login failed. Please try again later.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="Email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-3 py-2 border"
            required
          />
        </div>

        {validationError && <p className="text-red-600">{validationError}</p>}
        {status === "loading" && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2"
            disabled={status === "loading"} // Disable button if loading
          >
            Login
          </button>
        </div>
      </form>

      <div className="text-center">
        <span className="text-gray-700">Don't have an account?</span>
        <button className="text-red-800" onClick={openSignUp}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
