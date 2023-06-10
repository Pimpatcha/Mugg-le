import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoweb from '../img/Icon.png'
import axios from 'axios';
import './CSS/AllItems.css'

function AllItems() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const myFunction = (searchText) => {
    const filteredProducts = products.filter((product) => product.name.includes(searchText));
    setProducts(filteredProducts);
  };

  return (
    <div>
      <div className='startbar'>
        <a className="logo" target="_blank" rel="noopener noreferrer">
          <img src={logoweb} alt="logo" />
        </a>

        <div className='bar'>
          <input type="text" id="search" onChange={(e) => myFunction(e.target.value)} placeholder="Search..." />
        </div>

        <input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon" />
        <label htmlFor="menu-icon"></label>

        <nav className="nav">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><a>All Items</a></li>
            <li><Link to="/mycollection">My Collection</Link></li>
            <li><Link to="/problem">Problem</Link></li>
          </ul>
        </nav>

      </div>

      <div className='item'>
        {products.map((product) => (
          <div key={product._id}>
            <Link to={`/item/${product._id}`}> {/* เพิ่มลิงก์ไปยังหน้ารายละเอียดสินค้า */}
              <img src={`http://localhost:8080/images/${product.image}`} alt={product.name} />
              <p>{product.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllItems
