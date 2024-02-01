import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../App.css";
import Delete from "../assets/delete.svg";
import Edit from "../assets/edit.svg";
import UserService from "../services/UserService";
import MyToastError from "./MyToastError";
import MyToastSuccess from "./MyToastSuccess";

function UserTable({ users, onUserEdited, onUserDeleted }) {
  const [show, setShow] = useState(false);
  const [activeUser, setActiveUser] = useState({
    address: {
      city: "",
      houseNumber: undefined,
      postalCode: undefined,
      streetName: "",
    },
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastError, setShowToastError] = useState(false);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setActiveUser();
  };

  const handleShowEditModal = (id) => {
    setShowEditModal(true);
    setActiveUser(users.find((task) => task.id === id));
  };

  const handleEditChanges = (e, field) => {
    if (field === "name") {
      setActiveUser({ ...activeUser, name: e.target.value });
    }

    if (field === "email") {
      setActiveUser({ ...activeUser, email: e.target.value });
    }

    if (field === "password") {
      setActiveUser({ ...activeUser, password: e.target.value });
    }

    if (field === "city") {
      setActiveUser({
        ...activeUser,
        address: { ...activeUser.address, city: e.target.value },
      });
    }

    if (field === "postalCode") {
      setActiveUser({
        ...activeUser,
        address: { ...activeUser.address, postalCode: e.target.value },
      });
    }

    if (field === "streetName") {
      setActiveUser({
        ...activeUser,
        address: { ...activeUser.address, streetName: e.target.value },
      });
    }

    if (field === "houseNumber") {
      setActiveUser({
        ...activeUser,
        address: { ...activeUser.address, houseNumber: e.target.value },
      });
    }
  };

  const handleClose = () => {
    setShow(false);
    setActiveUser();
  };

  const handleShow = (id) => {
    setShow(true);
    setActiveUser(users.find((user) => user.id === id));
  };

  const deleteUser = async () => {
    try {
      const res = await UserService.deleteUser(activeUser.id);
      if (res.data === "User deleted successfully") {
        setShow(false);
        // Fetch All Users;
        onUserEdited();
        // Fetch All Tasks --> Tasks deleted if assigned to deleted User
        onUserDeleted();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitEditedUser = async () => {
    try {
      const res = await UserService.updateUser(activeUser.id, activeUser);
      if (res.data) {
        onUserEdited();
        setShowEditModal(false);
        setShowToastSuccess(true);
        setTimeout(() => setShowToastSuccess(false), 3000);
      }
    } catch (error) {
      console.log(error);
      setShowToastError(true);
      setTimeout(() => setShowToastError(false), 3000);
    }
  };

  return (
    <div
      className="user-table"
      style={{
        border: "3px solid black",
        margin: "30px 8%",
        padding: "30px",
      }}
    >
      <h4 style={{ marginBottom: "40px" }}>Current Active Users</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            {/* <th scope="col">E-mail</th> */}
            <th scope="col">Password</th>
            <th scope="col">Zip Code</th>
            <th scope="col">City</th>
            <th scope="col">Street</th>
            <th scope="col">HouseNumber</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* <td>{user.password}</td> */}
              <td>{user.address.postalCode}</td>
              <td>{user.address.city}</td>
              <td>{user.address.streetName}</td>
              <td>{user.address.houseNumber}</td>
              <td>
                <div className="btn-selection">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleShowEditModal(user.id)}
                  >
                    <img src={Edit} alt="Edit Task" />
                  </button>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => {
                      handleShow(user.id);
                    }}
                  >
                    <img src={Delete} alt="Delete Task" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {activeUser && (
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="row g-3 m-0">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Testo Steron"
                  value={activeUser.name}
                  onChange={(event) => {
                    handleEditChanges(event, "name");
                  }}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control"
                  placeholder="myName@email.com"
                  value={activeUser.email}
                  onChange={(event) => {
                    handleEditChanges(event, "email");
                  }}
                />
              </div>
              <div className="col-md-12">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(event) => {
                    handleEditChanges(event, "password");
                  }}
                />
              </div>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="My street"
                  value={
                    activeUser && activeUser.address
                      ? activeUser.address.streetName
                      : ""
                  }
                  onChange={(event) => {
                    handleEditChanges(event, "streetName");
                  }}
                />
              </div>
              <div className="col-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Number"
                  value={
                    activeUser && activeUser.address
                      ? activeUser.address.houseNumber
                      : undefined
                  }
                  onChange={(event) => {
                    handleEditChanges(event, "houseNumber");
                  }}
                />
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={
                    activeUser && activeUser.address
                      ? activeUser.address.city
                      : ""
                  }
                  onChange={(event) => {
                    handleEditChanges(event, "city");
                  }}
                />
              </div>

              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Zip Code"
                  value={
                    activeUser && activeUser.address
                      ? activeUser.address.postalCode
                      : undefined
                  }
                  onChange={(event) => {
                    handleEditChanges(event, "postalCode");
                  }}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button variant="warning" onClick={submitEditedUser}>
              Update User
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Notification Toast */}
      <MyToastSuccess
        show={showToastSuccess}
        onClose={() => setShowToastSuccess(false)}
      >
        Congrats! Task edited successfully!
      </MyToastSuccess>
      <MyToastError
        show={showToastError}
        onClose={() => setShowToastError(false)}
      >
        Error! Task edit failed!
      </MyToastError>

      {/* Confirmation Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this User?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserTable;
