import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

function EditUserModal({
  show,
  handleClose,
  user,
  handleEditChanges,
  submitEditedUser,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="userName">
            <Form.Control
              type="text"
              placeholder="Name"
              value={user.name || ""}
              onChange={(e) => handleEditChanges(e, "name")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              value={user.email || ""}
              onChange={(e) => handleEditChanges(e, "email")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userStreet">
            <Form.Control
              type="text"
              placeholder="Street"
              value={user.address.street || ""}
              onChange={(e) => handleEditChanges(e, "streetName")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userHouseNumber">
            <Form.Control
              type="number"
              placeholder="House Number"
              value={user.address.houseNumber || ""}
              onChange={(e) => handleEditChanges(e, "houseNumber")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userCity">
            <Form.Control
              type="text"
              placeholder="City"
              value={user.address.city || ""}
              onChange={(e) => handleEditChanges(e, "city")}
            />
          </Form.Group>

          <Form.Group controlId="userPostalCode">
            <Form.Control
              type="number"
              placeholder="Postal Code"
              value={user.address.postalCode || ""}
              onChange={(e) => handleEditChanges(e, "postalCode")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="warning" onClick={submitEditedUser}>
          Update User
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
