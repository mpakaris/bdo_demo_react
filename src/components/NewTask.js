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
              disabled={
                !title || !description || assignee === "Assign User to Task"
              }
            >
              Add Task
            </button>
          </div>
        </form>
      </div>

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
