import React, { useState } from "react";
import UserService from "../services/UserService";
import MyToastError from "./MyToastError";
import MyToastSuccess from "./MyToastSuccess";

function NewUser({ onUserAdded, setUserMsg }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState();
  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState();
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastError, setShowToastError] = useState(false);

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
        street: streetName,
        houseNumber: houseNumber,
      },
    };

    try {
      const res = await UserService.createUser(userDTO);
      if (res) {
        onUserAdded();
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
      <div style={{ margin: "30px 20%" }}>
        <form className="row g-3 m-5" onSubmit={formSubmit}>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={handleNameChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="name@email.com"
              onChange={handleEmailChange}
            />
          </div>
          <div className="col-md-12">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="col-8">
            <input
              type="text"
              className="form-control"
              placeholder="Street"
              onChange={handleStreetNameChange}
            />
          </div>
          <div className="col-4">
            <input
              type="number"
              className="form-control"
              placeholder="House"
              onChange={handleHouseNumberChange}
            />
          </div>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="City"
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
      </div>

      <MyToastSuccess
        show={showToastSuccess}
        onClose={() => setShowToastSuccess(false)}
      >
        Congrats! User added successfully!
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

export default NewUser;
