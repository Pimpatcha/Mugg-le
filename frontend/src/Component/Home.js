import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../ContextApi';
import logoweb from '../img/Icon.png'

const Home = () => {
const { userData } = useContext(DataContext);
  console.log(userData.firstName);

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

        <div className="section-center">
          <txt>Welcome to <span>Wizth World</span>, <br /> {userData?.firstName} {userData?.lastName}</txt>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
