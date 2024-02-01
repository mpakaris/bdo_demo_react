import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import TaskService from "../services/TaskService";

function NewTask({ users, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("Assign User to Task");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleAssigneeChange = (userName) => {
    setAssignee(userName);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const user = users.find((user) => user.name === assignee);

    const taskDTO = {
      title: title,
      description: description,
      userId: user.id,
    };

    try {
      const res = await TaskService.createTask(taskDTO);
      if (res) {
        setShowSuccess(true);
        onTaskAdded();
      }
    } catch (error) {
      setShowError(true);
      console.log(error);
    }
  };

  return (
    <div>
      <form className="row g-3 m-5" onSubmit={formSubmit}>
        <div className="col-md-9">
          <input
            type="text"
            className="form-control"
            placeholder="Task Title"
            onChange={handleTitleChange}
          />
        </div>
        <div className="col-md-3 mr-0">
          <Dropdown onSelect={handleAssigneeChange}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {assignee}
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
            onChange={handleDescriptionChange}
          ></textarea>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-warning text-light"
            disabled={!title || !description || !assignee}
          >
            Add Task
          </button>
        </div>
      </form>
      {showError && (
        <p className="text-danger">
          Sorry, something went wrong. We could not create the New Task in the
          Database. Please try again.
        </p>
      )}
      {showSuccess && (
        <p className="text-success">
          Congratulations! Task added successfully to the Database.
        </p>
      )}
    </div>
  );
}

export default NewTask;
