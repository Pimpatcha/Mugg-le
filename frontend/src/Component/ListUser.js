import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import logoweb from '../img/Icon.png'

const ListUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}`);
      fetchData(); // Fetch updated user data after deletion
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <div className='startbar'>
        <a className="logo">
          <img src={logoweb} alt="logo" />
        </a>

        <input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon" />
        <label htmlFor="menu-icon"></label>

        <nav className="nav">
          <ul>
            <li><a>Home</a></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/allitems">All Items</Link></li>
            <li><Link to="/mycollection">My Collection</Link></li>
            <li><Link to="/problem">Problem</Link></li>
          </ul>
        </nav>
      </div>

      <tab className='tab'>
        <h1>List of Users</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button className="del-btn" onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table></tab>
    </div>
  );
};

export default ListUser;

