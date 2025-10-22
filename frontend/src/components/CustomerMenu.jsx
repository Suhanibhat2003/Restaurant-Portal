import React from 'react'
import axios from "axios";
import { useState,useEffect } from 'react';

const CustomerMenu = () => {
  
  const [menu, setMenu] = useState([])
  
  const fetchMenu = async() => {
    await axios.get("http://localhost:5000/api/menu").then((res) => {
      setMenu(res.data)
    })
      .catch((err) => {
      console.error("Error Loading Menu:",err)
    })
  }
  useEffect(() => {
    fetchMenu()
  }, [])
  

  return (
    
    <div className="container my-4">
      <h2 className="mb-4">🍴 Customer Menu </h2>
      <div className='row'>
        {menu.map((item) => (
          <div className="col-md-4 mb-3" key={item._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5>{item.name}</h5>
                <p className="text-muted">{item.category}</p>
                <p>₹{item.price}</p>
                <button className='btn btn-primary'>Add</button>
              </div>
              </div>
          </div>
        ))}
      </div>

    </div>
    

  )
}

export default CustomerMenu