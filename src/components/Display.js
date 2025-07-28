import React, { useEffect, useState } from "react";
import Axios from "axios";

import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const Display = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();

  
  const handleDelete = async (id) => {
    try {
      await Axios.delete(`${API_URL}/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error(`Failed to delete user with ID ${id}:`, error);
    }
  };


  const cacheUserData = ({ id, name, email, username }) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await Axios.get(API_URL);
        let updatedList = data;

        
        const newUser = location.state?.newUser;

        if (newUser && !updatedList.some((u) => u.id === newUser.id)) {
          updatedList = [...updatedList, newUser];
        }

      
        const editedUser = location.state?.updatedUser;

        if (editedUser) {
          updatedList = updatedList.map((u) =>
            u.id === editedUser.id ? editedUser : u
          );
        }

        setUsers(updatedList);
      } catch (err) {
        console.error("Error fetching users list:", err);
      }
    };

    fetchUsers();
  }, [location.state]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Directory</h2>

      <div className="row">
        {users.map((user) => (
          <div className="col-md-4 mb-4" key={user.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">
                  <strong>Username:</strong> {user.username}
                  <br />
                  <strong>Email:</strong> {user.email}
                </p>
                <div className="d-flex justify-content-between">
                  <Link to="/edit">
                    <button className="btn btn-outline-primary" onClick={() => cacheUserData(user)}>Edit</button>
                  </Link>
                  <button className="btn btn-outline-danger" onClick={() => handleDelete(user.id)}> Delete </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/create">
          <button className="btn btn-success mt-4">Add New User</button>
        </Link>
      </div>
    </div>
  );
};

export default Display;
