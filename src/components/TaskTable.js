import React, { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import "../App.css";
import Delete from "../assets/delete.svg";
import Edit from "../assets/edit.svg";
import TaskService from "../services/TaskService";
import MyToastError from "./MyToastError";
import MyToastSuccess from "./MyToastSuccess";

function TaskTable({ tasks, users, onTaskEdited, onUserEdited }) {
  const [show, setShow] = useState(false);
  const [activeTask, setActiveTask] = useState(undefined);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastError, setShowToastError] = useState(false);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setActiveTask();
  };

  const handleShowEditModal = (id) => {
    setShowEditModal(true);
    setActiveTask(tasks.find((task) => task.id === id));
  };

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
    try {
      const res = await TaskService.deleteTask(activeTask.id);
      if (res.status === 204) {
        setShow(false);
        onTaskEdited();
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

  const handleChange = (e, field) => {
    if (field === "title") {
      setActiveTask({
        ...activeTask,
        taskTitle: e.target.value,
      });
    }

    if (field === "description") {
      setActiveTask({
        ...activeTask,
        taskDescription: e.target.value,
      });
    }
  };

  const handleAssigneeChange = (userName) => {
    const newAssigneeId = users.find((user) => user.name === userName).id;
    setActiveTask({
      ...activeTask,
      user: { id: newAssigneeId },
    });
  };

  const submitEditedTask = async () => {
    const taskDTO = {
      id: activeTask.id,
      taskTitle: activeTask.taskTitle,
      taskDescription: activeTask.taskDescription,
      user: { id: activeTask.user.id },
    };

    try {
      const res = await TaskService.updateTask(activeTask.id, taskDTO);
      if (res.data) {
        onTaskEdited();
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
      className="task-table"
      style={{ border: "3px solid black", margin: "30px 8%", padding: "30px" }}
    >
      <h4 style={{ marginBottom: "40px" }}>
        Current Active Tasks: {tasks.length}
      </h4>
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
              <td>{task.taskTitle}</td>
              <td>{task.taskDescription}</td>
              <td>{findAssigneeById(task.user.id)}</td>
              <td>
                <div className="btn-selection">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleShowEditModal(task.id)}
                  >
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

      {/* Edit Modal */}
      {activeTask && (
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="row g-3">
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Task Title"
                  value={activeTask.taskTitle}
                  onChange={(event) => handleChange(event, "title")}
                />
              </div>
              <div className="col-md-3 mr-0">
                <Dropdown onSelect={handleAssigneeChange}>
                  <Dropdown.Toggle variant="secondary">
                    {users.find((user) => user.id === activeTask.user.id).name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {users.map((user) => (
                      <Dropdown.Item key={user.id} eventKey={user.name}>
                        {user.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Description of Task"
                  value={activeTask.taskDescription}
                  onChange={(event) => handleChange(event, "description")}
                ></textarea>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button variant="warning" onClick={submitEditedTask}>
              Update Task
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
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
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
