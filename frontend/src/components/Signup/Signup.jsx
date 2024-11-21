import React from "react";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="addUser">
      <h3>Registration Page</h3>
      <form className="addUserForm">
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            placeholder="Enter your name"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
          />
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="off"
            placeholder="Enter your Phone Number"
            pattern="[0-9]{10}"
          />
          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
