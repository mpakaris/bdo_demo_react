import React from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";

const EditTaskModal = ({
  show,
  handleClose,
  task,
  users,
  handleChange,
  handleAssigneeChange,
  submit,
}) => (
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
            value={task.taskTitle}
            onChange={(event) => handleChange(event, "title")}
          />
        </div>
        <div className="col-md-3 mr-0">
          <Dropdown onSelect={handleAssigneeChange}>
            <Dropdown.Toggle variant="secondary">
              {users.find((user) => user.id === task.user.id).name}
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
            value={task.taskDescription}
            onChange={(event) => handleChange(event, "description")}
          ></textarea>
        </div>
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="warning" onClick={submit}>
        Update Task
      </Button>
    </Modal.Footer>
  </Modal>
);

export default EditTaskModal;
