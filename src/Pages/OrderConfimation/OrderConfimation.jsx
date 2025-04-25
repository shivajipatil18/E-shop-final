import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  const orderDetails = useSelector((state) => state.order.orderDetails);

  const latestOrder = orderDetails?.[orderDetails.length - 1];

  if (!latestOrder) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-red-600">No Order Found</h2>
        <Link
          to="/"
          className="inline-block mt-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-16 lg:px-24">
      <h2 className="text-4xl font-bold mb-8 text-center text-green-600">
        🎉 Thank You! Your Order is Confirmed
      </h2>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 space-y-6">
        <div className="text-center border-b pb-6">
          <h3 className="text-2xl font-semibold mb-2">Order Summary</h3>
          <p><strong>Order Number:</strong> {latestOrder.orderNumber}</p>
          <p><strong>Order Date:</strong> {latestOrder.date}</p>
          <p><strong>Total Amount:</strong> <span className="text-green-600 font-bold">Rs {latestOrder.totalPrice}</span></p>
          <p><strong>Payment Method:</strong> {latestOrder.paymentMethod}</p>
        </div>

        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
          <p><strong>Address:</strong> {latestOrder.shippingInformation?.address}</p>
          <p><strong>City:</strong> {latestOrder.shippingInformation?.city}</p>
          <p><strong>Zip Code:</strong> {latestOrder.shippingInformation?.zip}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Ordered Products</h3>
          <div className="space-y-4">
            {latestOrder.products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 bg-gray-50 p-4 rounded shadow-sm"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-contain rounded border"
                />
                <div>
                  <p className="font-semibold text-lg">{product.name}</p>
                  <p className="text-gray-600">
                    Rs {product.price} x {product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <Link
          to="/"
          className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition duration-300 shadow-md"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
