import React, { useState } from "react";
import UserService from "../services/UserService";
import MyToastError from "./MyToastError";
import MyToastSuccess from "./MyToastSuccess";

function NewUser({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  // Add state for validation error messages
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!name) {
      errors["name"] = "Name cannot be empty.";
      formIsValid = false;
    }

    if (!email.match(/\S+@\S+\.\S+/)) {
      errors["email"] = "Invalid email format.";
      formIsValid = false;
    }

    if (password.length < 8) {
      errors["password"] = "Password must be at least 8 characters long.";
      formIsValid = false;
    }

    if (!city) {
      errors["city"] = "City cannot be empty.";
      formIsValid = false;
    }

    if (!postalCode.match(/^\d{4}$/)) {
      errors["postalCode"] = "Postal code must be 4 digits.";
      formIsValid = false;
    }

    if (!streetName) {
      errors["streetName"] = "Street name cannot be empty.";
      formIsValid = false;
    }

    if (isNaN(houseNumber) || houseNumber <= 0) {
      errors["houseNumber"] = "House number must be greater than 0.";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setShowToastError(true);
      setTimeout(() => setShowToastError(false), 3000);
      return;
    }

    const userDTO = {
      name,
      email,
      passwordHash: password,
      address: {
        city,
        postalCode,
        street: streetName,
        houseNumber,
      },
    };

    try {
      const res = await UserService.createUser(userDTO);
      if (res.status === 201) {
        setName("");
        setEmail("");
        setPassword("");
        setCity("");
        setPostalCode("");
        setStreetName("");
        setHouseNumber("");
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="col-md-12">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>
          <div className="col-8">
            <input
              type="text"
              className="form-control"
              placeholder="Street"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
            />
            {errors.streetName && (
              <div className="text-danger">{errors.streetName}</div>
            )}
          </div>
          <div className="col-4">
            <input
              type="number"
              className="form-control"
              placeholder="House"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
            />
            {errors.houseNumber && (
              <div className="text-danger">{errors.houseNumber}</div>
            )}
          </div>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && <div className="text-danger">{errors.city}</div>}
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Zip Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            {errors.postalCode && (
              <div className="text-danger">{errors.postalCode}</div>
            )}
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-warning text-light">
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
        Error! User addition failed!
      </MyToastError>
    </>
  );
}

export default NewUser;
