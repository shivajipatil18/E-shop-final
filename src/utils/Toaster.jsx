import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1000}
      theme="colored"
      newestOnTop
      pauseOnFocusLoss={false}
      closeOnClick
    />
  ); 
};

export default Toaster;
