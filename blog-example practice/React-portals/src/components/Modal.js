import React from "react";
import ReactDOM from "react-dom";
import index from "../index.css";

const Modal = ({ children }) => {
  const modalRoot = document.getElementById("modal-root");
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    modalRoot
  );
};

export default Modal;
