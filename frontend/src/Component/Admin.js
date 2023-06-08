import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../ContextApi';
import logoweb from '../img/Icon.png'

const Admin = () => {
const { userData } = useContext(DataContext);
  console.log(userData.firstName);

  return (
    <div>
      <div className='startbar'>
        <a className="logo" target="_blank" rel="noopener noreferrer">
          <img src={logoweb} alt="logo" />
        </a>

        <input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon" />
        <label htmlFor="menu-icon"></label>

        <nav className="nav">
          <ul>
            <li><a>Home</a></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/allitemsadmin">All Items</Link></li>
            <li><Link to="/listuser">List of User</Link></li>
            <li><Link to="/problemadmin">Problem</Link></li>
          </ul>
        </nav>

        <div className="section-center">
          <txt>Welcome, <br />Admin. {userData.firstName} {userData.lastName}</txt>
        </div>
      </div>
    </div>
    );
};

export default Admin;
