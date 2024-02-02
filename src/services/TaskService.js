import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

const TaskService = {
  // Create a new task
  createTask: function (userId, taskData) {
    return axios.post(API_URL + "/" + userId, taskData);
  },

  // Retrieve all tasks
  getAllTasks: function () {
    return axios.get(API_URL);
  },

  // Retrieve a single task by ID
  getTaskById: function (taskId) {
    return axios.get(API_URL + "/" + taskId);
  },

  // Update a task
  updateTask: function (taskId, taskData) {
    console.log(taskId, taskData);
    return axios.put(API_URL + "/" + taskId, taskData);
  },

  // Delete a task
  deleteTask: function (taskId) {
    return axios.delete(API_URL + "/" + taskId);
  },
};

export default TaskService;
