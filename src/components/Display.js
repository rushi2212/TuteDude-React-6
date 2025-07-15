import React, { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const Display = () => {
  const [myData, setData] = useState([]);
  const location = useLocation();

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`${API_URL}/${id}`);
      setData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const setDataToStorage = (id, name, email, username) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await Axios.get(API_URL);
        let users = response.data;

        if (location.state?.newUser) {
          const newUser = location.state.newUser;
          const exists = users.some((user) => user.id === newUser.id);
          if (!exists) {
            users = [...users, newUser];
          }
        }

        if (location.state?.updatedUser) {
          const updatedUser = location.state.updatedUser;
          users = users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          );
        }

        setData(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [location.state]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">User List</h2>
      <div className="row">
        {myData.map((user) => (
          <div className="col-md-4 mb-4" key={user.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">
                  <strong>Username:</strong> {user.username}
                  <br />
                  <strong>Email:</strong> {user.email}
                </p>
                <Link to="/edit">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() =>
                      setDataToStorage(
                        user.id,
                        user.name,
                        user.email,
                        user.username
                      )
                    }
                  >
                    Edit
                  </button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/create">
        <button className="btn btn-success mt-3 mb-3 m-auto d-block">
          Add User
        </button>
      </Link>
    </div>
  );
};

export default Display;
