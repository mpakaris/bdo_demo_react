import React, { useState } from "react";
import "../App.css";
import Delete from "../assets/delete.svg";
import Edit from "../assets/edit.svg";
import View from "../assets/view.svg";
import UserService from "../services/UserService";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditUserModal from "./EditUserModal";
import MyToastError from "./MyToastError";
import MyToastSuccess from "./MyToastSuccess";
import ViewUserDetails from "./ViewUserDetail";

function UserTable({ users, onUserEdited, onUserDeleted }) {
  const [show, setShow] = useState(false);
  const [activeUser, setActiveUser] = useState({
    address: {
      city: "",
      houseNumber: undefined,
      postalCode: undefined,
      street: "",
    },
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setActiveUser();
  };

  const handleShowEditModal = (id) => {
    setShowEditModal(true);
    setActiveUser(users.find((task) => task.id === id));
  };

  const handleViewModal = async (id) => {
    if (!showViewModal) {
      const res = await UserService.getUserById(id);console.log(res)
      if (res.status === 200) {
        setActiveUser(res.data);
      }
    }
    setShowViewModal(!showViewModal);
  };

  const handleEditChanges = (e, field) => {
    if (field === "name") {
      setActiveUser({ ...activeUser, name: e.target.value });
    }

    if (field === "email") {
      setActiveUser({ ...activeUser, email: e.target.value });
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
        address: { ...activeUser.address, street: e.target.value },
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
      if (res.status === 204) {
        setShow(false);
        // Fetch All Users;
        onUserEdited();
        // Fetch All Tasks --> Tasks deleted if assigned to deleted User
        onUserDeleted();
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
      <h4 style={{ marginBottom: "40px" }}>
        Current Active Users: {users.length}
      </h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Zip Code</th>
            <th scope="col">City</th>
            <th scope="col">Street</th>
            <th scope="col">HouseNumber</th>
            <th scope="col">Assigned Tasks</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.postalCode}</td>
              <td>{user.address.city}</td>
              <td>{user.address.street}</td>
              <td>{user.address.houseNumber}</td>
              <td>{user.tasks.length}</td>
              <td>
                <div className="btn-selection">
                  <button
                    className="btn btn-info"
                    onClick={() => handleViewModal(user.id)}
                  >
                    <img src={View} alt="View Task" />
                  </button>
                  <button
                    className="btn btn-warning ms-3"
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

      {/* User View Modal */}
      <ViewUserDetails
        showViewModal={showViewModal}
        handleViewModal={handleViewModal}
        activeUser={activeUser}
      />

      {/* Edit User Modal */}
      {activeUser && (
        <EditUserModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          user={activeUser}
          handleEditChanges={handleEditChanges}
          submitEditedUser={submitEditedUser}
        />
      )}

      {/* Delete User Confirmation Modal */}
      <DeleteConfirmationModal
        show={show}
        handleClose={handleClose}
        handleDelete={deleteUser}
      />

      {/* Notification Toast */}
      <MyToastSuccess
        show={showToastSuccess}
        onClose={() => setShowToastSuccess(false)}
      >
        Congrats! Everything went just fine!
      </MyToastSuccess>
      <MyToastError
        show={showToastError}
        onClose={() => setShowToastError(false)}
      >
        Error! Something went terribly wrong!
      </MyToastError>
    </div>
  );
}

export default UserTable;
