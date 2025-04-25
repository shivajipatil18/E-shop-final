import React from 'react';

const Modal = ({ isModalOpen, setIsModalOpen, children }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div  data-testid="modal" className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button 
         data-testid="close-modal-btn"
          className="absolute top-0 right-2 text-gray-600 text-2xl hover:text-gray-800 transition-transform transform hover:scale-110"
          onClick={() => setIsModalOpen(false)}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
