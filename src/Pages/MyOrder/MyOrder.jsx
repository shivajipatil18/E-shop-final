
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/OrderSlice"; 
import { Link } from "react-router-dom";

const MyOrder = () => {
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.order);
   
  const storedUser = localStorage.getItem("user");
  const loggedInUser  = storedUser ? JSON.parse(storedUser) : null;
  useEffect(() => {
   
    if (loggedInUser?.name) {
      dispatch(fetchOrders(loggedInUser.name)); 
    }
}, [dispatch]);
const userOrders = loggedInUser
? orderDetails?.filter((order) => order.username === loggedInUser.name)
: [];


  if (loading) {
    return <div className="text-center py-20 text-lg text-gray-600">Loading your orders...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">Error: {error}</div>;
  }

  if (!userOrders || orderDetails.length === 0) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">No Orders Found</h2>
        <Link
          to="/"
          className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Go Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-16 lg:px-24">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">My Orders</h2>
      <div className="space-y-8">
        {orderDetails.map((order, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Order <span className="text-red-600">#{order.orderNumber}</span>
              </h3>
              <span className="text-sm text-gray-600">{order.date}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Order Summary</h4>
                <p>
                  <strong>Total Price:</strong>{" "}
                  <span className="text-green-600 font-bold">Rs {order.totalPrice}</span>
                </p>
                <p>
                  <strong>Payment Method:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-1 text-sm rounded ${
                      order.paymentMethod === "Cash on Delivery"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.paymentMethod}
                  </span>
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Shipping Address</h4>
                <p>
                  <strong>Address:</strong> {order.shippingInformation?.address}
                </p>
                <p>
                  <strong>City:</strong> {order.shippingInformation?.city}
                </p>
                <p>
                  <strong>Zip Code:</strong> {order.shippingInformation?.zip}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Ordered Products</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center p-3 border rounded-lg hover:shadow-md transition"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-contain rounded border"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-700">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        Rs {product.price} x {product.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
