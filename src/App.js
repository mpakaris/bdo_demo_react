import React, { useEffect, useState } from "react";
import "./App.css";

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
        console.log(tasks);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    UserService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
        console.log(users);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [tasks, users]);

  return (
    <div className="App">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to BDO digital</h1>
          <p>This is a Demo Task Application</p>
          <p>by Nikos Mpakaris</p>
          <div className="btn-selection">
            <button className="btn btn-primary" onClick={console.log("Hit")}>
              User Management
            </button>
            <button
              className="btn btn-primary ms-3"
              onClick={console.log("Hit 2")}
            >
              Task Management
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
