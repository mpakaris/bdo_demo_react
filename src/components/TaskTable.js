import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../App.css";
import Delete from "../assets/delete.svg";
import Edit from "../assets/edit.svg";
import TaskService from "../services/TaskService";

function TaskTable({ tasks, users, onTaskEdited }) {
  const [show, setShow] = useState(false);
  const [activeTask, setActiveTask] = useState({});

  const handleClose = () => {
    setShow(false);
    setActiveTask();
  };

  const handleShow = (id) => {
    setShow(true);
    setActiveTask(tasks.find((task) => task.id === id));
  };

  const findAssigneeById = (id) => {
    const assignee = users.find((user) => user.id === id);
    return assignee ? assignee.name : "User not in DB";
  };

  const deleteTask = async () => {
    console.log(activeTask);
    try {
      const res = await TaskService.deleteTask(activeTask.id);
      if (res.data === "Task deleted successfully") {
        setShow(false);
        onTaskEdited();
      }
    } catch (error) {
      console.log(error);
    }
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
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => handleShow(task.id)}
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
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this task?
          {activeTask.name}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteTask}>
            Delete Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TaskTable;
