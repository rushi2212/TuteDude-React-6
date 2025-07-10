import React, { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const Display = () => {
  const [myData, setData] = useState([]);
  const location = useLocation();

  function handleDelete(id) {
    Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`).then(
      () => {
        setData((prevData) => prevData.filter((user) => user.id !== id));
      }
    );
  }

  function setDataToStorage(id, name, email, username) {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
  }

  useEffect(() => {
    Axios.get(API_URL)
      .then((response) => {
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
                  onClick={() => {
                    handleDelete(user.id);
                  }}
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
