import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`);
      navigate('/admin'); // เมื่อลบสินค้าเสร็จแล้วให้เปลี่ยนเส้นทางไปยังหน้า admin
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:8080/products/${id}/like`);
      // จัดการตรรกะสำหรับการอัปเดตจำนวนกดถูกใจบนออบเจ็กต์สินค้า
      setItem((prevItem) => ({
        ...prevItem,
        likes: prevItem.likes + 1,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <p>Type: {item.type}</p>
      <img src={`http://localhost:8080/images/${item.image}`} alt={item.name} />
      <p>Description: {item.description}</p>
      <p>Likes: {item.likes}</p>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ItemDetails;
