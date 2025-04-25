import React, { useState, useEffect, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/modal";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { setCart } from "../../redux/CartSlice";
import ProductSearch from "../ProductSearch";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const Products = useSelector((state) => state.cart.products);
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openSignUp = () => {
    setIsLoggedIn(false);
    setIsModelOpen(true);
  };
  const closeModal = () => {
    setIsModelOpen(false);
  };
  const updateLogin = (val) => {
    setIsLoggedIn(val);
  };
  const openLogin = () => {
    setIsLoggedIn(true);
    setIsModelOpen(true);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      dispatch(setCart(storedCart));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getUser = isAuthenticated || localStorage.getItem("user");
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "auth", isAuthenticated: false });
    setIsMenuOpen(false);
    navigate("/");
    // window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 md:px-10 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold text-red-600 tracking-tight"
        >
          e-Shop
        </Link>

        <div className="relative w-1/2 hidden md:block">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductSearch />
          </Suspense>
          <FaSearch className="absolute top-3 right-4 text-red-500" />
        </div>

        <div className="hidden md:flex items-center space-x-6 text-gray-700">
          <button
            onClick={() => {
              if (getUser) {
                navigate("/cart");
              } else {
                openLogin();
              }
            }}
            className="relative group"
          >
            <FaShoppingCart className="text-2xl group-hover:text-red-500 transition duration-300" />
            {Products.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs w-5 h-5 bg-red-600 text-white rounded-full flex justify-center items-center font-bold shadow-md">
                {Products.length}
              </span>
            )}
          </button>

          {localStorage.getItem("user") ? (
            <div className="text-sm flex items-center space-x-2">
              <span className="font-semibold text-gray-800">
                {JSON.parse(localStorage.getItem("user")).name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 font-medium hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="text-sm text-red-600 font-semibold hover:underline"
              onClick={openLogin}
            >
              Login / Register
            </button>
          )}
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl text-gray-700 hover:text-red-500 transition"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4 text-gray-700 font-medium">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-red-600"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-red-600"
          >
            Shop
          </Link>
          <Link
            to="/trending"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-red-600"
          >
            Trending Now
          </Link>
          <Link
            to="/account"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-red-600"
          >
            My Account
          </Link>

          {(isAuthenticated || localStorage.getItem("user")) && (
            <Link
              to="/my-orders"
              onClick={() => setIsMenuOpen(false)}
              className="block hover:text-red-600"
            >
              My Orders
            </Link>
          )}
          <Link
            to="/support"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-red-600"
          >
            Support / Help
          </Link>
        
          {user?.role === "admin" && (
            <Link
              to="/adminpanel"
              onClick={() => setIsMenuOpen(false)}
              className="block hover:text-red-600"
            >
              Admin Panel
            </Link>
          )}

         
          <button
            onClick={() => {
              setIsMenuOpen(false);
              if (getUser) navigate("/cart");
              else openLogin();
            }}
            className="flex items-center space-x-2"
          >
            <FaShoppingCart className="text-lg text-red-500" />
            <span>Cart ({Products.length})</span>
          </button>
          {/* Auth Buttons */}
          {localStorage.getItem("user") ? (
            <button onClick={handleLogout} className="text-red-600 font-medium">
              Logout
            </button>
          ) : (
            <button onClick={openLogin} className="text-red-600 font-medium">
              Login / Register
            </button>
          )}
        </div>
      )}

      {/* Bottom Nav (Desktop only) */}
      <div className="hidden md:block bg-gray-50 border-t border-b border-gray-200 py-3 shadow-sm">
        <div className="container mx-auto flex justify-center flex-wrap gap-x-10 gap-y-2 text-sm font-medium text-gray-700">
          <Link
            to="/"
            className="transition-all duration-200 hover:text-red-600 hover:underline underline-offset-4 px-2 py-1 rounded-md hover:bg-red-50"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="transition-all duration-200 hover:text-red-600 hover:underline underline-offset-4 px-2 py-1 rounded-md hover:bg-red-50"
          >
            Shop
          </Link>

          <Link
            to="/trending"
            className="transition-all duration-200 hover:text-red-600 hover:underline underline-offset-4 px-2 py-1 rounded-md hover:bg-red-50"
          >
            Trending Now
          </Link>
          <Link
            to="/account"
            className="transition-all duration-200 hover:text-red-600 hover:underline underline-offset-4 px-2 py-1 rounded-md hover:bg-red-50"
          >
            My Account
          </Link>
          {(isAuthenticated || localStorage.getItem("user")) && (
            <Link
              to="/my-orders"
              className="transition-all duration-200 hover:text-red-600 hover:underline underline-offset-4 px-2 py-1 rounded-md hover:bg-red-50"
            >
              My Orders
            </Link>
          )}
          <Link
            to="/support"
            className="transition-all duration-200 hover:text-red-600 hover:underline underline-offset-4 px-2 py-1 rounded-md hover:bg-red-50"
          >
            Support / Help
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/adminpanel"
              onClick={() => setIsMenuOpen(false)}
              className="block hover:text-red-600 px-2 py-1 rounded-md hover:bg-red-50"
            >
              Admin Panel
            </Link>
          )}

        </div>
      </div>

      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModelOpen}>
        {isLoggedIn ? (
          <Login
            closeModal={closeModal}
            updateLogin={updateLogin}
            openSignUp={openSignUp}
          />
        ) : (
          <Register
            closeModal={closeModal}
            openLogin={openLogin}
            updateLogin={updateLogin}
          />
        )}
      </Modal>
    </nav>
  );
};

export default Navbar;
