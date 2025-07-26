import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing users
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => setUsers(response.data))
      .catch(err => console.error("Error fetching users:", err));

    // Set current user data
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setUsername(localStorage.getItem("username"));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    // Validate uniqueness (excluding current user)
    const newErrors = {};
    const otherUsers = users.filter(user => user.id !== Number(id));
    
    if (otherUsers.some(user => user.email === email)) {
      newErrors.email = "Email already exists";
    }
    if (otherUsers.some(user => user.username === username)) {
      newErrors.username = "Username already exists";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate update and redirect
    navigate("/", {
      state: {
        updatedUser: {
          id: Number(id),
          name,
          email,
          username,
        },
      },
    });
  };

  return (
    <div className="container mt-5">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => window.history.back()}
      >
        Home
      </button>
      <h3 className="mb-4">Edit User</h3>
      <form onSubmit={handleUpdate} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <button type="submit" className="btn btn-success w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Edit;