import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Edit = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();


  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));

    setUserId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setUsername(localStorage.getItem("username"));

  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    const errors = {};
    const others = users.filter((u) => u.id !== Number(userId));

    if (others.some((u) => u.email === email)) {
      errors.email = "Email already used.";
    }


    if (others.some((u) => u.username === username)) {
      errors.username = "Username already taken.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    navigate("/", {
      state: {
        updatedUser: {
          id: Number(userId),
          name,
          email,
          username,
        },
      },
    });
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-3" onClick={() => window.history.back()}>
        ⬅ Back
      </button>
      <h2 className="mb-4 text-center">Edit User</h2>

      <form onSubmit={handleUpdate} className="mx-auto" style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input id="name"  type="text"  className="form-control" value={name} onChange={(e) => setName(e.target.value)} required/>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input id="email"  type="email"  className={`form-control ${validationErrors.email ? "is-invalid" : ""}`} value={email}  onChange={(e) => setEmail(e.target.value)} required/>

          {validationErrors.email && (
            <div className="invalid-feedback">{validationErrors.email}</div>
          )}

        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input  id="username" type="text"  className={`form-control ${validationErrors.username ? "is-invalid" : ""}`} value={username}  onChange={(e) => setUsername(e.target.value)}  required />

          {validationErrors.username && (
            <div className="invalid-feedback">{validationErrors.username}</div>
          )}
          
        </div>

        <button type="submit" className="btn btn-success w-100">Save Changes</button>
      </form>
    </div>
  );
};

export default Edit;
