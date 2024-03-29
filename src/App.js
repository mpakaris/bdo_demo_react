import React, { useEffect, useState } from "react";
import "./App.css";
import Diamond from "./assets/diamond.svg";
import NewTask from "./components/CreateViews/NewTask";
import NewUser from "./components/CreateViews/NewUser";
import TaskTable from "./components/TableViews/TaskTable";
import UserTable from "./components/TableViews/UserTable";
import TaskService from "./services/TaskService";
import UserService from "./services/UserService";

function App() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showNewTask, setShowNewTask] = useState(false);
  const [showNewUser, setShowNewUser] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    await UserService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    handleNewOptions();
  };

  const fetchTasks = async () => {
    await TaskService.getAllTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    handleNewOptions();
  };

  const handleShowNewTask = () => {
    setShowNewTask(true);
    setShowNewUser(false);
  };

  const handleShowNewUser = () => {
    setShowNewUser(true);
    setShowNewTask(false);
  };

  const handleNewOptions = () => {
    setShowNewUser(false);
    setShowNewTask(false);
  };

  return (
    <div className="App">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to BDO digital</h1>
          <p>This is a Demo Task Application</p>
          <p>by Nikos Mpakaris</p>
          <div className="btn-selection">
            <button className="btn btn-primary" onClick={handleShowNewUser}>
              Add New User
            </button>

            <button
              className="btn btn-primary ms-3"
              onClick={handleShowNewTask}
              disabled={users.length < 1}
            >
              Add New Task
            </button>
            {(showNewTask || showNewUser) && (
              <button className="btn btn-info ms-3" onClick={handleNewOptions}>
                <img src={Diamond} alt="Close new Options" />
              </button>
            )}
          </div>
        </div>
      </div>

      {showNewUser && <NewUser onUserAdded={fetchUsers} />}
      {showNewTask && (
        <NewTask
          users={users}
          onTaskAdded={() => {
            fetchUsers();
            fetchTasks();
          }}
        />
      )}

      {users.length > 0 && (
        <div className="users-table">
          <UserTable
            users={users}
            onUserEdited={fetchUsers}
            onUserDeleted={fetchTasks}
          />
        </div>
      )}
      {tasks.length > 0 && (
        <div className="task-table">
          <TaskTable
            tasks={tasks}
            users={users}
            onTaskEdited={fetchTasks}
            onUserEdited={fetchUsers}
          />
        </div>
      )}
    </div>
  );
}

export default App;
