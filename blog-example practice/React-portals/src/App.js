import React, { useState } from "react";
import Modal from "./components/Modal";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>React Portals Demo</h1>
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      {showModal && (
        <Modal>
          <div className="modal-content">
            <h2>This is a Modal</h2>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
