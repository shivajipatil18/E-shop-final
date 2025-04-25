import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../redux/OrderSlice";
import { fetchAllUsers } from "../../redux/UserSlice";
import {
  updateProduct,
  deleteProduct,
  fetchProducts,
} from "../../redux/ProductSlice";

const AdminPanel = () => {
  const dispatch = useDispatch();

  const {
    allOrders,
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.order || {});

  const {
    users,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.user || {});

  const {
    products,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.product || {});

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchAllUsers());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      await dispatch(updateProduct({ productId, updatedData })).unwrap();
      console.log("Product updated successfully");
      dispatch(fetchProducts()); // Refresh the product list
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      console.log("Product deleted successfully");
      dispatch(fetchProducts()); 
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (orderLoading || userLoading || productLoading) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Loading data...
      </div>
    );
  }

  if (orderError || userError || productError) {
    return (
      <div className="text-center py-20 text-red-600">
        Error: {orderError || userError || productError}
      </div>
    );
  }

  if (!allOrders || allOrders.length === 0) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          No Orders Found
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-10">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Admin Panel - All Orders
      </h2>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-3 border">Order #</th>
              <th className="px-4 py-3 border">Username</th>
              <th className="px-4 py-3 border">Date</th>
              <th className="px-4 py-3 border">Total Price</th>
              <th className="px-4 py-3 border">Payment</th>
              <th className="px-4 py-3 border">Address</th>
              <th className="px-4 py-3 border">Products</th>
              {/* <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Actions</th> */}
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {allOrders.map((order, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 border text-center text-red-600 font-semibold">
                  #{order.orderNumber}
                </td>
                <td className="px-4 py-3 border text-center">
                  {order.username}
                </td>
                <td className="px-4 py-3 border text-center">{order.date}</td>
                <td className="px-4 py-3 border text-center text-green-600 font-bold">
                  ₹ {order.totalPrice}
                </td>
                <td className="px-4 py-3 border text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      order.paymentMethod === "Cash on Delivery"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.paymentMethod}
                  </span>
                </td>
                <td className="px-4 py-3 border text-sm">
                  {order.shippingInformation?.address},{" "}
                  {order.shippingInformation?.city},{" "}
                  {order.shippingInformation?.zip}
                </td>
                <td className="px-4 py-3 border">
                  <div className="space-y-3">
                    {order.products.map((product, idx) => (
                      <div
                        key={`${product.id}-${idx}`}
                        className="flex justify-between items-center gap-3 border-b pb-2"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-contain border rounded"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-gray-500">
                              ₹{product.price} × {product.quantity}
                            </p>
                          </div>
                          {/* <td className="px-4 py-2 border text-center">
                            
                  <select
                    value={order.status || "Pending"}  // Use default value if status is missing
                    onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td> */}

                        </div>
                        <div>
                          {/* <button
                            onClick={() =>
                              handleUpdateProduct(product.id, {
                                name: product.name,
                                price: product.price,
                              })
                            }
                            className="text-blue-600 hover:text-blue-800 text-xs"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800 ml-2 text-xs"
                          >
                            Delete
                          </button> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Users Table */}
      <h2 className="text-3xl font-bold mt-16 mb-6 text-center text-gray-800">
        All Registered Users
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-3 border">User ID</th>
              <th className="px-4 py-3 border">Username</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Role</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {users.map((user, index) => (
              <tr
                key={`${user.id}-${index}`}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3 border text-center">{user.id}</td>
                <td className="px-4 py-3 border text-center">
                  {user.username}
                </td>
                <td className="px-4 py-3 border text-center">{user.email}</td>
                <td className="px-4 py-3 border text-center capitalize">
                  {user.role || "customer"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
