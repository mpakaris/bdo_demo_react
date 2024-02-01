import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

const UserService = {
  // Create a new user
  createUser: function (userData) {
    return axios.post(API_URL, userData);
  },

  // Retrieve all users
  getAllUsers: function () {
    return axios.get(API_URL);
  },

  // Retrieve a single user by ID
  getUserById: function (userId) {
    return axios.get(API_URL + "/" + userId);
  },

  // Update a user
  updateUser: function (userId, userData) {
    return axios.put(API_URL + "/" + userId, userData);
  },

  // Delete a user
  deleteUser: function (userId) {
    return axios.delete(API_URL + "/" + userId);
  },
};

export default UserService;
