import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../ContextApi';
import axios from 'axios';

const Update = () => {
    const { userData, setUserData } = useContext(DataContext);
    const [updatedUser, setUpdatedUser] = useState({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:8080/update', updatedUser);
          setUserData(updatedUser);
          alert('Profile updated successfully');
          navigate('/profile');
        } catch (error) {
          console.error(error);
          alert('Failed to update profile');
        }
      };

    const navigate = useNavigate();
    const Profile = () => {
        navigate('/profile');
    };

    return (
        <div className="container">
            <h1 className='up-page'>Update Profile</h1>
            <form onSubmit={handleUpdate}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Firstname..."
                    value={updatedUser.firstName}
                    onChange={handleChange}
                />

                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Lastname..."
                    value={updatedUser.lastName}
                    onChange={handleChange}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email..."
                    value={updatedUser.email}
                    onChange={handleChange}
                />

                <label htmlFor="password">New Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="new password..."
                    value={updatedUser.password}
                    onChange={handleChange}
                />

                <div>
                    <button type="submit" className="btn">Submit</button>
                    <button className="btn" onClick={Profile}>Back</button>
                </div>

            </form>
        </div>
    );
};

export default Update;
