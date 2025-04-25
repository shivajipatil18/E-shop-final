import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "../../Components/Modal/modal";
import ChangeAddress from "../../Components/ChangeAddress/ChangeAddress";
import EmptyCart from "../../assets/Images/emptyCart.jpeg";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setCart,
} from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
const navigate = useNavigate();
  const [address, setAddress] = useState("main street 0012");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      dispatch(setCart(storedCart));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div data-testid="cart-wrapper" className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      {cart && cart.products && cart.products.length > 0 ? (
        <div data-testid="cart-filled">
          <h3 className="text-2xl font-semibold mb-4">SHOPPING CART</h3>
          <div className="flex flex-col md:flex-row justify-between space-x-10 mt-8">
            <div className="md:w-2/3">
              <div className="flex justify-between border-b items-center mb-4 text-xs font-bold">
                <p>PRODUCTS</p>
                <div className="flex space-x-8">
                  <p>PRICE</p>
                  <p>QUANTITY</p>
                  <p>SUBTOTAL</p>
                  <p>REMOVE</p>
                </div>
              </div>
              <div data-testid="cart-items">
                {cart?.products.map((product) => (
                  <div key={product.id}   className="flex items-center space-x-4">
                    <div className="md:flex items-center space-x-4">
                      <img
                        src={product?.image}
                        alt={product.name}
                        className="w-16 h-16 object-contain rounded pt-3"
                      />
                    </div>
                    <div data-testid={`product-name-${product.id}`} className="flex-1 ml-4">
                      <h3 className="text-lg font-semibold">{product?.name}</h3>
                    </div>
                    <div data-testid={`product-price-${product.id}`} className="flex space-x-12 items-center">
                      <p>₹{product?.price.toFixed(2)}</p>
                      <div className="flex items-center justify-center border">
                        <button
                        data-testid="decrease-btn"
                          className="text-xl font-bold justify-center border-r w-5"
                          onClick={() => dispatch(decreaseQuantity(product.id))}
                        >
                          -
                        </button>
                        <p className="text-xl px-1 border-1">
                          {product?.quantity}
                        </p>
                        <button
                          className="text-xl px-1 border-1"
                          onClick={() => dispatch(increaseQuantity(product.id))}
                        >
                          {" "}
                          +
                        </button>
                      </div>
                      <p> ₹{(product.quantity * product.price).toFixed(2)}</p>
                      <button
                        data-testid="remove-btn"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          dispatch(removeFromCart(product.id));
                          toast.error("Product removed from cart");
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-sm font-bold mb-5">CART TOTAL</h3>

              <div className="flex justify-between mb-5 border-b pb-1">
                <span className="text-sm">Total Items</span>
                <span>{cart.totalQuantity}</span>
              </div>

              <div className="text-left mb-2">
                <p>Shipping:</p>
                <p>Shipping to:</p>
                <span className="text-xs">{address}</span>
              </div>

              <button
              data-testid="change-address-btn"
                className="text-blue-500 hover:underline mt-1 ml-2"
                onClick={() => setIsModalOpen(true)}
              >
                Change the address
              </button>

              <div className="flex justify-between mt-6 mb-4 text-gray-700 font-medium">
                <span>Total Price</span>
                <span> ₹{Math.round(cart.totalPrice)}</span>
              </div>

              <button
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                onClick={() => Navigate("/checkout")}
              >
                Proceed with Checkout
              </button>
            </div>
          </div>

          <Modal data-testid="modal" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
            <ChangeAddress
              setAddress={setAddress}
              setIsModalOpen={setIsModalOpen}
            />
          </Modal>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
  <img src={EmptyCart} alt="Empty Cart" className="w-64 h-64 object-contain mb-6" />
  <p className="text-xl text-gray-600 font-medium">Your cart is currently empty</p>
  <button
    onClick={() => navigate('/')}
    className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
  >
    Shop Now
  </button>
</div>

      )}
    </div>
  );
};

export default Cart;
