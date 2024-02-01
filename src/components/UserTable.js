import React from "react";
import Delete from "../assets/delete.svg";
import Edit from "../assets/edit.svg";
// import TaskService from "./services/TaskService";
// import UserService from "./services/UserService";
import "../App.css";

function UserTable({ users }) {
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
                  <button className="btn btn-danger ms-3">
                    <img src={Delete} alt="Edit Task" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
