import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../ContextApi';
import logoweb from '../img/Icon.png';
import './CSS/Home.css';

const Admin = () => {
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
      setSelectedImage((prevImage) => {
        const images = [
          'image-url-1.jpg',
          'image-url-2.jpg',
          'image-url-3.jpg',
          'image-url-4.jpg',
          'image-url-5.jpg',
        ];
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 3000);

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
            <li><Link to="/allitemsadmin">All Items</Link></li>
            <li><Link to="/listuser">List of User</Link></li>
            <li><Link to="/problemadmin">Problem</Link></li>
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
            <div className="popup active">
              <div className="popup-content">
                <h3>Edit Images</h3>
                <div className="image-grid">
                  <img src="image-url-1.jpg" alt="Image 1" onClick={() => setSelectedImage('image-url-1.jpg')} />
                  <img src="image-url-2.jpg" alt="Image 2" onClick={() => setSelectedImage('image-url-2.jpg')} />
                  <img src="image-url-3.jpg" alt="Image 3" onClick={() => setSelectedImage('image-url-3.jpg')} />
                  <img src="image-url-4.jpg" alt="Image 4" onClick={() => setSelectedImage('image-url-4.jpg')} />
                  <img src="image-url-5.jpg" alt="Image 5" onClick={() => setSelectedImage('image-url-5.jpg')} />
                </div>
                <button onClick={handleImageSave}>Save</button>
              </div>
            </div>
          )}
          <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
        </div>

        {/* <div className="section-center">
          <txt>Welcome to <span>Wizth World</span>, <br /> {userData?.firstName} {userData?.lastName}</txt>
        </div> */}
      </div>
    </div>
  );
};

export default Admin;
