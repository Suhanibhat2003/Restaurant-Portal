import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminMenu = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    taxPercent: "",
  });
  const [menu, setMenu] = useState([]);

  const fetchMenu = async () => {
    await axios
      .get("http://localhost:5000/api/menu")
      .then((res) => {
        setMenu(res.data);
      })
      .catch((err) => {
        console.error("Error Loading Menu", err);
      });
  };
  useEffect(() => {
    fetchMenu();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newform = { ...formData, [name]: value };
    setFormData(newform);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/menu", {
        ...formData,
        price: Number(formData.price),
        taxPercent: Number(formData.taxPercent),
      })
      .then(() => {
        setFormData({
          name: "",
          price: "",
          category: "",
          taxPercent: "",
        });
        fetchMenu();
      })
      .catch((err) => {
        console.error("Error adding menu item:", err);
      });
  };
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/menu/${id}`)
      .then(() => {
        fetchMenu();
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  return (
    <>
      <div className="container my-4">
        <h2 className="mb-4">🍴 Admin Menu Manager</h2>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row g-2">
            <div className="col-md-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                name="taxPercent"
                placeholder="Tax %"
                className="form-control"
                value={formData.taxPercent}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="category"
                placeholder="Category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-success w-100">Add</button>
            </div>
          </div>
        </form>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Tax Percent</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.taxPercent || 0}%</td>
                <td>{item.category}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminMenu;
