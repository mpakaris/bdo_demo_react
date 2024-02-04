import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function EditUserModal({
  show,
  handleClose,
  user,
  handleEditChanges,
  submitEditedUser,
}) {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    streetName: "",
    houseNumber: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    if (!show) {
      setErrors({
        name: "",
        email: "",
        streetName: "",
        houseNumber: "",
        city: "",
        postalCode: "",
      });
    }
  }, [show]);

  const validateField = (field, value) => {
    let errMsg = "";
    switch (field) {
      case "name":
        errMsg = value.trim() ? "" : "Name cannot be empty.";
        break;
      case "email":
        errMsg = /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email format.";
        break;
      case "streetName":
        errMsg = value.trim() ? "" : "Street name cannot be empty.";
        break;
      case "houseNumber":
        errMsg = value > 0 ? "" : "House number must be greater than 0.";
        break;
      case "city":
        errMsg = value.trim() ? "" : "City cannot be empty.";
        break;
      case "postalCode":
        errMsg = /^\d{4,5}$/.test(value)
          ? ""
          : "Postal code must be 4 or 5 digits.";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: errMsg }));
  };

  const modifiedHandleEditChanges = (e, field) => {
    const { value } = e.target;
    validateField(field, value);
    handleEditChanges(e, field);
  };

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
              onChange={(e) => modifiedHandleEditChanges(e, "name")}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="userEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              value={user.email || ""}
              onChange={(e) => modifiedHandleEditChanges(e, "email")}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="userStreet">
            <Form.Control
              type="text"
              placeholder="Street"
              value={user.address.street || ""}
              onChange={(e) => modifiedHandleEditChanges(e, "streetName")}
            />
            {errors.streetName && (
              <div className="text-danger">{errors.streetName}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="userHouseNumber">
            <Form.Control
              type="number"
              placeholder="House Number"
              value={user.address.houseNumber || ""}
              onChange={(e) => modifiedHandleEditChanges(e, "houseNumber")}
            />
            {errors.houseNumber && (
              <div className="text-danger">{errors.houseNumber}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="userCity">
            <Form.Control
              type="text"
              placeholder="City"
              value={user.address.city || ""}
              onChange={(e) => modifiedHandleEditChanges(e, "city")}
            />
            {errors.city && <div className="text-danger">{errors.city}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="userPostalCode">
            <Form.Control
              type="number"
              placeholder="Postal Code"
              value={user.address.postalCode || ""}
              onChange={(e) => modifiedHandleEditChanges(e, "postalCode")}
            />
            {errors.postalCode && (
              <div className="text-danger">{errors.postalCode}</div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="warning"
          onClick={submitEditedUser}
          disabled={Object.values(errors).some((error) => error !== "")}
        >
          Update User
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
