import React from "react";
import Delete from "../assets/delete.svg";
import Edit from "../assets/edit.svg";
// import TaskService from "./services/TaskService";
// import UserService
import "../App.css";

function TaskTable({ tasks, users }) {
  const findAssigneeById = (id) => {
    const assignee = users.find((user) => user.id === id);
    return assignee ? assignee.name : "User not in DB";
  };

  return (
    <div
      className="task-table"
      style={{ border: "3px solid black", margin: "30px 8%", padding: "30px" }}
    >
      <h4 style={{ marginBottom: "40px" }}>Current Active Tasks</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Assignee</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <th scope="row">{task.id}</th>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{findAssigneeById(task.userId)}</td>
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

export default TaskTable;
