import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../ContextApi';
import logoweb from '../img/Icon.png';
import './CSS/Home.css';

const Home = () => {
  const { userData } = useContext(DataContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
    // Perform save image logic here
    setIsEditing(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Logic to rotate images automatically every 5 seconds
    }, 5000);

    return () => {
      clearInterval(interval);
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
            <li><Link to="/allitems">All Items</Link></li>
            <li><Link to="/mycollection">My Collection</Link></li>
            <li><Link to="/problem">Problem</Link></li>
          </ul>
        </nav>

        <div className="slideshow">
          <img src={selectedImage || 'image-url-1.jpg'} alt="Slide 1" />
          <img src={selectedImage || 'image-url-2.jpg'} alt="Slide 2" />
          <img src={selectedImage || 'image-url-3.jpg'} alt="Slide 3" />
          <img src={selectedImage || 'image-url-4.jpg'} alt="Slide 4" />
          <img src={selectedImage || 'image-url-5.jpg'} alt="Slide 5" />
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
