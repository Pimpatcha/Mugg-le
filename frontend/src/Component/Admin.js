import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../ContextApi';
import logoweb from '../img/Icon.png';
import './CSS/Home.css';
import firebase from './firebase';

const Home = () => {
  const { userData } = useContext(DataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [slideImages, setSlideImages] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSave = () => {
    if (selectedImage) {
      firebase.database().ref('images').push(selectedImage); // บันทึกภาพลงใน Firebase Realtime Database
    }
    setIsEditing(false);
  };

  useEffect(() => {
    // อ่านข้อมูลภาพจาก Firebase Realtime Database เมื่อโหลดครั้งแรก
    const initialLoad = firebase.database().ref('images');
    initialLoad.on('value', (snapshot) => {
      const images = snapshot.val();
      if (images) {
        const imageArray = Object.values(images);
        setSlideImages(imageArray);
        setSelectedImage(imageArray[0]);
      }
    });

    // ปิดการติดตามการเปลี่ยนแปลงเมื่อ Component unmounts
    return () => {
      initialLoad.off();
    };
  }, []);

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
            <li><Link to="/allitemsadmin">All Items</Link></li>
            <li><Link to="/listuser">List of User</Link></li>
            <li><Link to="/problemadmin">Problem</Link></li>
          </ul>
        </nav>

        <div className="slideshow">
          {slideImages.map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index + 1}`} />
          ))}
        </div>

        <div className="edit-button">
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={!isEditing} />
          {isEditing && (
            <button onClick={handleImageSave}>Save</button>
          )}
          <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
        </div>

        <div className="section-center">
          <txt>Welcome to <span>Wizth World</span>, <br /> {userData?.firstName} {userData?.lastName}</txt>
        </div>
      </div>
    </div>
  );
};

export default Home;

