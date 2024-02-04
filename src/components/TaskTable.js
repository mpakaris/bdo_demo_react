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
  const [show, setShow] = useState(false);
  const [activeTask, setActiveTask] = useState(undefined);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
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

  const handleViewModal = async (id) => {
    if (!showViewModal) {
      const res = await TaskService.getTaskById(id);
      if (res) {
        setActiveTask(res.data);
      }
    }
    setShowViewModal(!showViewModal);
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
                    onClick={() => handleViewModal(task.id)}
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

      {/* Task View Modal */}
      <ViewTaskDetails
        showViewModal={showViewModal}
        handleViewModal={handleViewModal}
        activeTask={activeTask}
      />

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

      {/* Edit Task Modal */}
      {activeTask && (
        <EditTaskModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          task={activeTask}
          users={users}
          handleChange={handleChange}
          handleAssigneeChange={handleAssigneeChange}
          submit={submitEditedTask}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={show}
        handleClose={handleClose}
        handleDelete={deleteTask}
      />
    </div>
  );
}

export default TaskTable;
