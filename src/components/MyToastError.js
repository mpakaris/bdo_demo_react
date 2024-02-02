import React from "react";
import { Toast } from "react-bootstrap";

function MyToastError({ show, onClose, children }) {
  return (
    <Toast show={show} onClose={onClose} delay={3000} autohide>
      <Toast.Header>
        <strong className="mr-auto">Error</strong>
      </Toast.Header>
      <Toast.Body className="text-warning">{children}</Toast.Body>
    </Toast>
  );
}

export default MyToastError;
