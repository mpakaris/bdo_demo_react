import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmationModal = ({ show, handleClose, handleDelete }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Delete Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Delete Task
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteConfirmationModal;
