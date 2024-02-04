import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import TaskService from "../services/TaskService";
import MyToastError from "./MyToastError";
import MyToastSuccess from "./MyToastSuccess";

function NewTask({ users, onTaskAdded, setUserMsg }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("Assign User to Task");
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  const [titleLimitReached, setTitleLimitReached] = useState(false);
  const [descriptionLimitReached, setDescriptionLimitReached] = useState(false);

  const handleTitleChange = (e) => {
    if (e.target.value.length <= 50) {
      setTitle(e.target.value);
      setTitleLimitReached(false);
    } else {
      setTitleLimitReached(true);
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 250) {
      setDescription(e.target.value);
      setDescriptionLimitReached(false);
    } else {
      setDescriptionLimitReached(true);
    }
  };
  const handleAssigneeChange = (userName) => {
    setAssignee(userName);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const user = users.find((user) => user.name === assignee);
    const taskDTO = {
      taskTitle: title,
      taskDescription: description,
    };

    try {
      const res = await TaskService.createTask(user.id, taskDTO);
      if (res.status === 201) {
        onTaskAdded();
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
    <>
      <div style={{ margin: "30px 18%" }}>
        <form className="row g-3 m-5" onSubmit={formSubmit}>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Task Title"
              onChange={handleTitleChange}
              value={title}
            />
            {titleLimitReached && (
              <small className="text-danger">
                Max limit of characters reached: 50
              </small>
            )}
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
              value={description}
            ></textarea>
            {descriptionLimitReached && (
              <small className="text-danger">
                Max limit of characters reached: 250
              </small>
            )}
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-warning text-light"
              disabled={
                !title || !description || assignee === "Assign User to Task"
              }
            >
              Add Task
            </button>
          </div>
        </form>
      </div>

      {/* Notification Toast */}
      <MyToastSuccess
        show={showToastSuccess}
        onClose={() => setShowToastSuccess(false)}
      >
        Congrats! Task added successfully!
      </MyToastSuccess>
      <MyToastError
        show={showToastError}
        onClose={() => setShowToastError(false)}
      >
        Error! Task failed!
      </MyToastError>
    </>
  );
}

export default NewTask;
