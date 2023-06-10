import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../ContextApi';
import logoweb from '../img/Icon.png'
import './CSS/Profile.css'

const Profile = () => {
  const { userData, setUserData } = useContext(DataContext);

  const navigate = useNavigate();
  const update = () => {
    navigate('/update');
  };
  const logout = () => {
    navigate('/');
  };

  return (
    <div>
      <div>
        <div className='startbar'>
          <a className="logo">
            <img src={logoweb} alt="logo" />
          </a>

          <input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon" />
          <label htmlFor="menu-icon"></label>

          <nav className="nav">
            <ul>
              <li>
                {userData.email === 'mindsingh@outlook.com' ? (
                  <Link to="/admin">Home</Link>
                ) : (
                  <Link to="/home">Home</Link>
                )}
              </li>

              <li><a>My Profile</a></li>

              <li>
                {userData.email === 'mindsingh@outlook.com' ? (
                  <Link to="/allitemsadmin">All Items</Link>
                ) : (
                  <Link to="/allitems">All Items</Link>
                )}
              </li>

              <li>
                {userData.email === 'mindsingh@outlook.com' ? (
                  <Link to="/listuser">List of User</Link>
                ) : (
                  <Link to="/mycollection">My Collection</Link>
                )}
              </li>
              
              <li>
                {userData.email === 'mindsingh@outlook.com' ? (
                  <Link to="/problemadmin">Problem</Link>
                ) : (
                  <Link to="/problem">Problem</Link>
                )}
              </li>

            </ul>
          </nav>
        </div>
      </div>

      <div className="container">
        <h1 className='pro-page'>My Profile</h1>
        <p>
          <strong>First Name : </strong> {userData.firstName}
        </p>
        <p>
          <strong>Last Name : </strong> {userData.lastName}
        </p>
        <p>
          <strong>Email : </strong> {userData.email}
        </p>

        <button className="btn-p" onClick={update}>Edit Profile</button> <br />
        <button className="btn-p" onClick={logout}>Log out</button>
      </div>
    </div>
  );
};

export default Profile;
