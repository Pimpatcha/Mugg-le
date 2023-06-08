import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repassword: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        const { firstName, lastName, email, password, repassword } = user;
        if (firstName && lastName && email && password) {
            if (password === repassword) {
                try {
                    await axios.post('http://localhost:8080/register', user);
                    alert('Successfully registered');
                    navigate('/');
                } catch (error) {
                    console.error(error);
                    alert('Registration failed');
                }
            } else {
                alert('Check Your Password');
            }
        } else {
            alert('Enter the Required Fields');
        }
    };

    return (
        <div>
            <h1>Welcome Muggle!</h1>
            <div className="container">
                <form>
                    <label htmlFor="firstname">
                        <b>First Name</b>
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        placeholder="Firstname..."
                        onChange={handleChange}
                        name="firstName"
                        value={user.firstName}
                    />

                    <label htmlFor="lastname">
                        <b>Last Name</b>
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        placeholder="Lastname..."
                        onChange={handleChange}
                        name="lastName"
                        value={user.lastName}
                    />

                    <label htmlFor="email">
                        <b>Email</b>
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="email..."
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="password">
                        <b>Password</b>
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="password..."
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />

                    <label htmlFor="re-password">
                        <b>Confirm-Password</b>
                    </label>
                    <input
                        type="password"
                        id="re-password"
                        placeholder="confirm-password..."
                        name="repassword"
                        value={user.repassword}
                        onChange={handleChange}
                    />

                    <div className="btn-container">
                        <button className="btn" onClick={handleSubmit}>
                            Register
                        </button>
                        <button className="btn" onClick={() => navigate('/')}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
