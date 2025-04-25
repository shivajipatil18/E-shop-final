import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./ProductSlice";
import cartReducer from "./CartSlice";
import authReducer from './authSlice';
import orderReducer from "./OrderSlice";
import accountReducer from "./AccountSlice"
import userReducer from "./UserSlice";
import { use } from "react";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
    account: accountReducer,
    user: userReducer,
  },
});
export default store;