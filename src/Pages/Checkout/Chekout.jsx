import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RazorpayButton from "../../Components/RazorpayButton";
import { clearCart } from "../../redux/CartSlice";
import { setOrderDetails, saveOrder } from "../../redux/OrderSlice";
import { validateCheckoutForm } from "../../utils/Validation"; 


const Chekout = () => {
  const [BillingToggle, setBillingToggle] = useState(true);
  const [shippingToggle, setShippingToggle] = useState(false);
  const [paymentToggle, setPaymentToggle] = useState(false);
  const [paymentMethod, setPaymentMethods] = useState("cod");
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleOrder = async (e) => {
    e.preventDefault();
    const validateForm = () => {
      const validationErrors = validateCheckoutForm(billingInfo, shippingInfo, paymentMethod);
      setErrors(validationErrors);
      return Object.keys(validationErrors). length === 0;
    };
    
    
    if (!validateForm()) {
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user?.name || "Guest";
    const newOrder = {
      products: cart.products,
      orderNumber: "ORD" + Math.floor(Math.random() * 1000000),
      billingInformation: billingInfo,
      shippingInformation: shippingInfo,
      username: userName,
      totalPrice: Math.round(cart.totalPrice),
      paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Debit Card",
      date: new Date().toLocaleString(),
    };

    await dispatch(saveOrder(newOrder));
    dispatch(setOrderDetails(newOrder));
    dispatch(clearCart());
    navigate("/order-confirmation");
  };

  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      <form onSubmit={handleOrder}>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Checkout</h3>
          <div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-10 mt-8">
            <div className="md:w-2/3">
              {/* Billing Info */}
              <div className="border p-2 mb-6">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setBillingToggle(!BillingToggle)}
                >
                  <h3 className="text-lg font-semibold mb-2">Billing Information</h3>
                  {BillingToggle ? <FaAngleDown /> : <FaAngleUp />}
                </div>
                <div className={`space-y-4 ${BillingToggle ? "" : "hidden"}`}>
                  <div className="flex flex-col">
                    <label className="text-gray-700">Name</label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      className="w-full px-3 py-2 border rounded"
                      value={billingInfo.name}
                      onChange={(e) => setBillingInfo({ ...billingInfo, name: e.target.value })}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700">Email</label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="w-full px-3 py-2 border rounded"
                      value={billingInfo.email}
                      onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700">Phone</label>
                    <input
                      type="number"
                      placeholder="Enter Phone"
                      className="w-full px-3 py-2 border rounded"
                      value={billingInfo.phone}
                      onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="border p-2 mb-6">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setShippingToggle(!shippingToggle)}
                >
                  <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
                  {shippingToggle ? <FaAngleDown /> : <FaAngleUp />}
                </div>
                <div className={`space-y-4 ${shippingToggle ? "" : "hidden"}`}>
                  <div className="flex flex-col">
                    <label className="text-gray-700">Address</label>
                    <input
                      type="text"
                      placeholder="Enter Address"
                      className="w-full px-3 py-2 border rounded"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700">City</label>
                    <input
                      type="text"
                      placeholder="Enter City"
                      className="w-full px-3 py-2 border rounded"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700">Zip Code</label>
                    <input
                      type="number"
                      placeholder="Enter Zip Code"
                      className="w-full px-3 py-2 border rounded"
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                    />
                    {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="border p-2 mb-6">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setPaymentToggle(!paymentToggle)}
                >
                  <h3 className="text-lg font-semibold mb-2">Payment Methods</h3>
                  {paymentToggle ? <FaAngleDown /> : <FaAngleUp />}
                </div>
                <div className={`space-y-4 ${paymentToggle ? "" : "hidden"}`}>
                  <RazorpayButton totalAmount={Math.round(cart.totalPrice)} />

                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethods("cod")}
                      className="mr-2"
                    />
                    <label className="text-gray-700">Cash on Delivery</label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "dc"}
                      onChange={() => setPaymentMethods("dc")}
                      className="mr-2"
                    />
                    <label className="text-gray-700">Debit Card</label>
                  </div>
                  {errors.paymentMethod && (
                    <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>
                  )}
                </div>
              </div>
            </div>

        
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border mt-8 md:mt-0">
              <h3 className="text-sm font-semibold mb-5">Order Summary</h3>
              <div className="space-y-4">
                {cart.products.map((product) => (
                  <div key={product.id} className="flex justify-between">
                    <div className="flex items-center">
                      <img src={product.image} alt="" className="w-16 h-16 object-contain rounded" />
                      <div className="ml-4">
                        <h4 className="text-md font-semibold">{product.name}</h4>
                        <p className="text-gray-600">
                          {product.price} x {product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between">
                  <span>Total Price:</span>
                  <span className="font-semibold">Rs {cart.totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 mt-6 hover:bg-red-800 rounded"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chekout;