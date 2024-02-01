import React, { useState } from "react";
import UserService from "../services/UserService";

function NewUser({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState();
  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleStreetNameChange = (e) => {
    setStreetName(e.target.value);
  };

  const handleHouseNumberChange = (e) => {
    setHouseNumber(e.target.value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const userDTO = {
      name: name,
      email: email,
      password: password,
      address: {
        city: city,
        postalCode: postalCode,
        streetName: streetName,
        houseNumber: houseNumber,
      },
    };

    try {
      const res = await UserService.createUser(userDTO);
      console.log(res);
      if (res) {
        setShowSuccess(true);
        onUserAdded();
      }
    } catch (error) {
      setShowError(true);
      console.log(error);
    }
  };

  return (
    <div>
      <form className="row g-3 m-5" onSubmit={formSubmit}>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Testo Steron"
            onChange={handleNameChange}
          />
        </div>
        <div className="col-md-6">
          <input
            type="email"
            className="form-control"
            placeholder="myName@email.com"
            onChange={handleEmailChange}
          />
        </div>
        <div className="col-md-12">
          <input
            type="password"
            className="form-control"
            placeholder="my password"
            onChange={handlePasswordChange}
          />
        </div>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            placeholder="My street"
            onChange={handleStreetNameChange}
          />
        </div>
        <div className="col-4">
          <input
            type="number"
            className="form-control"
            placeholder="house number"
            onChange={handleHouseNumberChange}
          />
        </div>
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="My city"
            onChange={handleCityChange}
          />
        </div>

        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Zip Code"
            onChange={handlePostalCodeChange}
          />
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-warning text-light"
            disabled={
              !name ||
              !email ||
              !password ||
              !city ||
              !streetName ||
              !postalCode ||
              !houseNumber
            }
          >
            Add User
          </button>
        </div>
      </form>
      {showError && (
        <p className="text-danger">
          Sorry, something went wrong. We could not save the User in the
          Database. Please try again.
        </p>
      )}
      {showSuccess && (
        <p className="text-success">
          Congratulations! New User added successfully to the Database.
        </p>
      )}
    </div>
  );
}

export default NewUser;