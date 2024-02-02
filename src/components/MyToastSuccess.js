import React from "react";
import { Toast } from "react-bootstrap";
import "../App.css";

function MyToastSuccess({ show, onClose, children }) {
  return (
    <div className="toast-container">
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className="text-success">{children}</Toast.Body>
      </Toast>
    </div>
  );
}

export default MyToastSuccess;
