import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../ContextApi';
import logoweb from '../img/Icon.png';
import './CSS/Admin.css';
import $ from 'jquery';

const Admin = () => {
  const { userData } = useContext(DataContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageData, setImageData] = useState([
    'image-url-1.jpg',
    'image-url-2.jpg',
    'image-url-3.jpg',
    'image-url-4.jpg',
    'image-url-5.jpg'
  ]);

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

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedImageData = [...imageData];
        updatedImageData[index] = reader.result;
        setImageData(updatedImageData);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const slideNext = () => {
      $('.inner-wrapper').animate({ left: '-200%' }, 200, function () {
        $(this).css('left', '-100%');
        $('.slide').last().after($('.slide').first());
      });
    };

    // Enabling auto scroll
    let sliderInterval = setInterval(slideNext, 3000);

    $('.prev').on('click', function () {
      $('.inner-wrapper').animate({ left: '0%' }, 200, function () {
        $(this).css('left', '-100%');
        $('.slide').first().before($('.slide').last());
      });
    });

    $('.next').on('click', function () {
      clearInterval(sliderInterval);
      slideNext();
    });

    return () => {
      clearInterval(sliderInterval);
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

        <div className="box">
          <div className="section-center">
          <p>Welcome to <span>Wizth World</span>, <br /> {userData?.firstName} {userData?.lastName}</p>
          </div>
          <div className="set">
            <div className="slider-wrapper">
              <div className="inner-wrapper">
                <div className="slide"> <img src={require("../img/Items/Slide/2.webp")} alt="slide01" /></div>
                <div className="slide"> <img src={require("../img/Items/Slide/12.webp")} alt="slide02" /></div>
                <div className="slide"> <img src={require("../img/Items/Slide/8.webp")} alt="slide03" /></div>
                <div className="slide"> <img src={require("../img/Items/Slide/6.webp")} alt="slide04" /></div>
                <div className="slide"> <img src={require("../img/Items/Slide/10.webp")} alt="slide05" /></div>
              </div>
            </div>
            <div className="button prev"></div>
            <div className="button next"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;
