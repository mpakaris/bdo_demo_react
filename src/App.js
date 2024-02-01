import React, { useEffect, useState } from "react";
import "./App.css";
import TaskTable from "./components/TaskTable";
import UserTable from "./components/UserTable";
import TaskService from "./services/TaskService";
import UserService from "./services/UserService";

// style={{ border: "3px solid red" }}

function App() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    TaskService.getAllTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    UserService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to BDO digital</h1>
          <p>This is a Demo Task Application</p>
          <p>by Nikos Mpakaris</p>
          <div className="btn-selection">
            <button className="btn btn-primary">Add New User</button>
            <button className="btn btn-primary ms-3">Add New Task</button>
          </div>
        </div>
      </div>
      <div className="users-table">
        <UserTable users={users} />
      </div>
      <div className="task-table">
        <TaskTable tasks={tasks} users={users} />
      </div>
    </div>
  );
}

export default App;
