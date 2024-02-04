import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import TaskService from "../../services/TaskService";

const EditTaskModal = ({ show, handleClose, task, users, onTaskUpdated }) => {
  const [editedTask, setEditedTask] = useState({
    id: task?.id || "",
    taskTitle: "",
    taskDescription: "",
    user: { id: "", name: "" },
  });

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task, show]);

  const handleChange = (event, field) => {
    setEditedTask((prevTask) => ({
      ...prevTask,
      [field]: event.target.value,
    }));
  };

  const handleAssigneeChange = (userName) => {
    const user = users.find((user) => user.name === userName);
    setEditedTask((prevTask) => ({
      ...prevTask,
      user: { id: user.id, name: user.name },
    }));
  };

  const submit = async () => {
    try {
      const res = await TaskService.updateTask(editedTask.id, editedTask);
      if (res.data) {
        onTaskUpdated();
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const initialAssigneeName =
    users.find((user) => user.id === editedTask.user.id)?.name || "Select User";

  return (
    <Modal show={show} onHide={handleClose}>
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
              value={editedTask.taskTitle || ""}
              onChange={(event) => handleChange(event, "taskTitle")}
            />
          </div>
          <div className="col-md-3 mr-0">
            <Dropdown onSelect={handleAssigneeChange}>
              <Dropdown.Toggle variant="secondary">
                {initialAssigneeName}
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
              value={editedTask.taskDescription || ""}
              onChange={(event) => handleChange(event, "taskDescription")}
            ></textarea>
          </div>
        </form>
        {editedTask.taskTitle.length === 0 && (
          <p className="text-danger">Title of Task cannot remain empty.</p>
        )}
        {editedTask.taskDescription.length === 0 && (
          <p className="text-danger">Description of Task cannot be empty.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="warning"
          onClick={submit}
          disabled={
            editedTask.taskTitle.length === 0 ||
            editedTask.taskDescription.length === 0
          }
        >
          Update Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
