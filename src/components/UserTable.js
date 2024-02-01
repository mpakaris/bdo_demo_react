import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Delete from "../assets/delete.svg";
import Edit from "../assets/edit.svg";
import UserService from "../services/UserService";

import "../App.css";

function UserTable({ users, onUserEdited, onUserDeleted }) {
  const [show, setShow] = useState(false);
  const [activeUser, setActiveUser] = useState({});

  const handleClose = () => {
    setShow(false);
    setActiveUser();
  };

  const handleShow = (id) => {
    setShow(true);
    setActiveUser(users.find((user) => user.id === id));
  };

  const deleteUser = async () => {
    console.log(activeUser);
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
                  <button className="btn btn-warning">
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
