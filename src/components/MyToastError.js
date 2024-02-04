import React from "react";
import { Toast } from "react-bootstrap";

function MyToastError({ show, onClose, children }) {
  return (
    <div className="toast-container">
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body className="text-warning">{children}</Toast.Body>
      </Toast>
    </div>
  );
}

export default MyToastError;
