import React, { useState } from "react";
import "../App.css";
import Delete from "../assets/delete.svg";
import Edit from "../assets/edit.svg";
import View from "../assets/view.svg";
import TaskService from "../services/TaskService";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditTaskModal from "./EditTaskModal";
import MyToastError from "./MyToastError";
import MyToastSuccess from "./MyToastSuccess";
import ViewTaskDetails from "./ViewTaskDetail";

function TaskTable({ tasks, users, onTaskEdited, onUserEdited }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastError, setShowToastError] = useState(false);

  const handleShowEditModal = (id) => {
    const task = tasks.find((task) => task.id === id);
    setActiveTask(task);
    setShowEditModal(true);
  };

  const handleShowViewModal = (id) => {
    const task = tasks.find((task) => task.id === id);
    setActiveTask(task);
    setShowViewModal(true);
  };

  const handleShowDeleteModal = (id) => {
    const task = tasks.find((task) => task.id === id);
    setActiveTask(task);
    setShowDeleteModal(true);
  };

  const findAssigneeById = (id) => {
    const assignee = users.find((user) => user.id === id);
    return assignee ? assignee.name : "User not in DB";
  };

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseViewModal = () => setShowViewModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const deleteTask = async () => {
    try {
      const res = await TaskService.deleteTask(activeTask.id);
      if (res.status === 204) {
        setShowDeleteModal(false);
        setShowToastSuccess(true);
        setTimeout(() => setShowToastSuccess(false), 3000);
        onTaskEdited();
        onUserEdited();
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
            <th scope="col" className="w-50">
              Description
            </th>
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
                    className="btn btn-info"
                    onClick={() => handleShowViewModal(task.id)}
                  >
                    <img src={View} alt="View Task" />
                  </button>
                  <button
                    className="btn btn-warning ms-3"
                    onClick={() => handleShowEditModal(task.id)}
                  >
                    <img src={Edit} alt="Edit Task" />
                  </button>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => handleShowDeleteModal(task.id)}
                  >
                    <img src={Delete} alt="Delete Task" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ViewTaskDetails
        showViewModal={showViewModal}
        handleViewModal={handleCloseViewModal}
        activeTask={activeTask}
      />

      <EditTaskModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        task={activeTask}
        users={users}
        onTaskUpdated={() => {
          setShowEditModal(false);
          onTaskEdited();
          onTaskEdited();
          onUserEdited();
        }}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={deleteTask}
        task={activeTask}
      />

      <MyToastSuccess
        show={showToastSuccess}
        onClose={() => setShowToastSuccess(false)}
      >
        Action completed successfully!
      </MyToastSuccess>
      <MyToastError
        show={showToastError}
        onClose={() => setShowToastError(false)}
      >
        Error! Action failed!
      </MyToastError>
    </div>
  );
}

export default TaskTable;
