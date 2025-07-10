import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setUsername(localStorage.getItem("username"));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

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
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Edit;
