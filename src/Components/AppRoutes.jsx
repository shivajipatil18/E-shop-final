import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AdminPanel from "../Pages/Admin/AdminPanel";
const Home = lazy(() => import("../Pages/Home/Home"));
const Shop = lazy(() => import("../Pages/Shop/Shop"));
const Cart = lazy(() => import("../Pages/cart/Cart"));
const Checkout = lazy(() => import("../Pages/Checkout/Chekout"));
const FilterData = lazy(() => import("../Pages/FilterData"));
const OrderConfirmation = lazy(() =>
  import("../Pages/OrderConfimation/OrderConfimation")
);
const ProductDetail = lazy(() =>
  import("../Pages/ProductDetail/ProductDetail")
);
const SearchResults = lazy(() => import("../components/SearchResults"));
const HelpSupport = lazy(() => import("../Pages/HelpSupport/HelpSupport"));
const TrendingNow = lazy(() => import("../Pages/about/TrendingNow"));
const MyAccount = lazy(() => import("../Pages/MyAccount/MyAccount"));
const Login = lazy(() => import("../Components/Login/Login"));
const MyOrder = lazy(() => import("../Pages/MyOrder/MyOrder"));
// import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";

const AppRoutes = ({ order, setOrder }) => {
  const user = JSON.parse(localStorage.getItem("user"))?.id;
  // const isAdmin = localStorage.getItem("isAdmin") === "true";
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <Routes>
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:id" element={<ProductDetail />} />
        <Route path="/support" element={<HelpSupport />} />

        <Route path="/trending" element={<TrendingNow />} />
        <Route path="/account" element={<MyAccount />} />
        {user && <Route path="/cart" element={<Cart />} />}
        {user && (
          <Route path="/checkout" element={<Checkout setOrder={setOrder} />} />
        )}
        <Route
          path="/order-confirmation"
          element={<OrderConfirmation order={order} />}
        />
        <Route path="/filter-data" element={<FilterData />} />

        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/my-orders" element={<MyOrder />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
