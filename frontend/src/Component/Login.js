import React, { useContext, useState } from 'react'
import axios from 'axios'
import { DataContext } from '../ContextApi';
import { useNavigate } from 'react-router-dom'
import Icon from '../img/Icon.png'

export const Login = () => {
    const { setUserData } = useContext(DataContext);
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // check admin email
        const isAdmin = user.email === 'mindsingh@outlook.com';
    
        axios.post('http://localhost:8080/login', user)
    .then((res) => {
      if (res.data.message === "Login Successful") {
        alert(res.data.message);
        setUserData(res.data.user);

        if (isAdmin) {
          // สำหรับเมล์แอดมิน
          navigate('/admin');
        } else {
          // สำหรับเมล์ผู้ใช้งานทั่วไป
          navigate('/home');
        }
      } else {
        alert(res.data.message);
      }
    });
};

    // console.log(user)

    return (
        <div>
            <h1>Welcome Magician!</h1>
            <div className='container'>
                <img src={Icon} alt="Icon" />
                <form>
                    <label htmlFor='email'><b>Email</b></label>
                    <input type="email" placeholder='email...' id="email" name='email' value={user.email} onChange={handleChange} />

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder='password...' id="password" name='password' value={user.password} onChange={handleChange} />

                    <div className='btn-container'>
                        <button className="btn" onClick={handleSubmit}>Login</button>
                        <button className="btn" onClick={() => navigate("/register")}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

