import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});


  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");

        setUsers(data)
      } catch (error) {
        console.error("Failed to load users:", error);

      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const errors = {};

    if (users.find((u) => u.email === email)) {
      errors.email = "Email is already registered.";
    }
    if (users.find((u) => u.username === username)) {
      errors.username = "Username is already used";
    }


    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const { data: createdUser } = await axios.post("https://jsonplaceholder.typicode.com/users", { name,  email, username, });

      setName("");
      setEmail("");
      setUsername("");

      setValidationErrors({});

      navigate("/", { state: { newUser: createdUser } });
    } catch (err) {
      console.error("Error creating  user:", err);
    }
  }, [email, username, name, users, navigate]);

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-3" onClick={() => window.history.back()}>
         Back
      </button>
      <h2 className="mb-4 text-center">Create New User</h2>

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input id="name" type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input id="email" type="email"  className={`form-control ${validationErrors.email ? "is-invalid" : ""}`} value={email} onChange={(e) => setEmail(e.target.value)}  required />

          {validationErrors.email && (
            <div className="invalid-feedback">{validationErrors.email}</div>
          )}

        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input id="username" type="text" className={`form-control ${validationErrors.username ? "is-invalid" : ""}`} value={username} onChange={(e) => setUsername(e.target.value)} required />

          {validationErrors.username && (
            <div className="invalid-feedback">{validationErrors.username}</div>
          )}
          
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
