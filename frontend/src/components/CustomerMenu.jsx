import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const CustomerMenu = () => {
  const [menu, setMenu] = useState([]);

  const fetchMenu = async () => {
    await axios
      .get("http://localhost:5000/api/menu")
      .then((res) => {
        setMenu(res.data);
      })
      .catch((err) => {
        console.error("Error Loading Menu:", err);
      });
  };
  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">🍴 Customer Menu</h2>
      <div className="row">
        {menu.map((item) => (
          <div className="col-md-4 mb-3" key={item._id}>
            <div className="card h-100 d-flex flex-row align-items-center p-2">
              <div className="card-img-left me-3" style={{ flex: "0 0 120px" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="img-fluid rounded"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="card-body p-2">
                <h5 className="card-title mb-1">{item.name}</h5>
                <p className="text-muted mb-1">{item.category}</p>
                <p className="mb-2 fw-bold">₹{item.price}</p>
                <button className="btn btn-primary btn-sm">Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerMenu;
