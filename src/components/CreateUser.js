import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing users to check for uniqueness
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => setUsers(response.data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate uniqueness
    const newErrors = {};
    if (users.some(user => user.email === email)) {
      newErrors.email = "Email already exists";
    }
    if (users.some(user => user.username === username)) {
      newErrors.username = "Username already exists";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post("https://jsonplaceholder.typicode.com/users", {
        name,
        email,
        username,
      });

      console.log(res);
      setName("");
      setEmail("");
      setUsername("");
      setErrors({});

      navigate("/", {
        state: { newUser: res.data },
      });
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="container mt-5">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => window.history.back()}
      >
        Home
      </button>
      <h3 className="mb-4">Add User</h3>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
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
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;