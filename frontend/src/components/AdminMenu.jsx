import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const AdminMenu = () => {
  const [menu, setMenu] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    taxPercent: "",
    image: null,
  });
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    category: "",
    taxPercent: "",
    image: null,
  });

  const fetchMenu = async () => {
    await axios
      .get(`${API_URL}/api/menu`)
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
    const type = e.target.type;
    const files = e.target.files;
    const newform = { ...formData, [name]: type === "file" ? files[0] : value };
    setFormData(newform);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", Number(formData.price));
    data.append("taxPercent", Number(formData.taxPercent));
    data.append("category", formData.category);
    if (formData.image) data.append("image", formData.image);
    await axios
      .post(`${API_URL}/api/menu`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setFormData({
          name: "",
          price: "",
          category: "",
          taxPercent: "",
          image: null,
        });
        document.getElementById("fileInput").value = ""; //for removing image name after clicking add button
        fetchMenu();
      })
      .catch((err) => {
        console.error("Error adding menu item:", err);
      });
  };
  const handleDelete = async (id) => {
    await axios
      .delete(`${API_URL}/api/menu/${id}`)
      .then(() => {
        fetchMenu();
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditData({
      name: item.name,
      price: item.price,
      category: item.category,
      taxPercent: item.taxPercent || 0,
      image: item.image || null,
    });
  };
  const handleEditChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;
    const files = e.target.files;
    const newForm = { ...editData, [name]: type == "file" ? files[0] : value };
    setEditData(newForm);
  };
  const handleSave = async (id) => {
    const data = new FormData();
    data.append("name", editData.name);
    data.append("price", Number(editData.price));
    data.append("taxPercent", Number(editData.taxPercent));
    data.append("category", editData.category);
    if (editData.image instanceof File) data.append("image", editData.image);
    await axios
      .put(`${API_URL}/api/menu/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setEditId(null);
        fetchMenu();
      })
      .catch((err) => console.error("Error updating item:", err));
  };
  const handleCancel = () => {
    setEditId(null);
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
            <div className="col-md-3">
              <input
                type="file"
                id="fileInput"
                name="image"
                accept="image/*"
                className="form-control"
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
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item._id}>
                {editId == item._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={editData.name}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={editData.price}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="taxPercent"
                        className="form-control"
                        value={editData.taxPercent}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="category"
                        className="form-control"
                        value={editData.category}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="form-control"
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleSave(item._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>{item.taxPercent || 0}%</td>
                    <td>{item.category}</td>
                    <td>
                      {item.image ? (
                        <img src={item.image} alt={item.name} width="80" height="50" />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminMenu;
